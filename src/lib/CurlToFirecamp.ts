
import parseCurl from 'parse-curl'
import { parse } from 'querystring'
import { constants, helpers, table } from '@firecamp/utility'
import { url as _url } from '@firecamp/url'
import { nanoid as uuid } from "nanoid"
import _cloneDeep from "lodash/cloneDeep"
import _merge from "lodash/merge"
import { ICurlToFirecamp, IRestLeaf, ITableRow } from './CurlToFirecamp.interface'
import { AuthState, BodyState } from './react-state'

const { RequestTypes } = constants
const { isValidObject } = helpers

export class CurlToFirecamp implements ICurlToFirecamp {

  private curlJSON: any

  constructor(curl: string) {
    this.curlJSON = parseCurl(curl)
  }

  querystringToTable(queryString: string): Array<ITableRow> {
    try {
      const queryObject = parse(queryString)

      return table.objectToTable(queryObject)
    } catch (error) {
      return []
    }
  }

  transformRequestBody(body: any, contentType: string): IRestLeaf {
    switch (contentType) {
      case 'application/x-www-form-urlencoded': {
        const _body = {
          'name': 'Default',
          'meta': {
            'is_default': true,
            'active_body_type': contentType
          },
          'body': {
            [contentType]: {
              'value': [],
              'headers': []
            }
          },
          _meta: {
            uuid: uuid(),
            request_uuid: '',
            request_type: RequestTypes.REST,
            project_uuid: ''
          }
        }

        _body.body['application/x-www-form-urlencoded'].value = this.querystringToTable(body || '')

        return _body
      }

      case 'multipart/form-data': {
        const _body = {
          'name': 'Default',
          'meta': {
            'is_default': true,
            'active_body_type': contentType
          },
          'body': {
            'multipart/form-data': {
              'value': [],
              'headers': []
            }
          },
          _meta: {
            uuid: uuid(),
            request_uuid: '',
            request_type: RequestTypes.REST,
            project_uuid: ''
          }
        }

        _body.body['multipart/form-data'].value = table.objectToTable(body || {})

        return _body
      }

      default: {
        // Format the JSON string
        if (contentType === 'application/json') {
          try {
            body = JSON.stringify(JSON.parse(body), null, 4)
            console.log({ body });

          } catch (error) {

          }
        }

        return {
          'name': 'Default',
          'meta': {
            'is_default': true,
            'active_body_type': contentType
          },
          body: {
            [contentType]: {
              value: body,
              headers: []
            }
          },
          _meta: {
            uuid: uuid(),
            request_uuid: '',
            request_type: RequestTypes.REST,
            project_uuid: ''
          }
        }
      }
    }
  }

  transform(): any {
    if (!this.curlJSON) return

    const { url, method, header = {}, body } = this.curlJSON

    // Rest request
    const restRequest: any = {
      url: _url.toObject(url),
      method,
      headers: table.objectToTable(header),
      scripts: {
        pre: '',
        post: '',
        test: ''
      },
      config: {
        ORIGIN: '',
        USERAGENT: '',
        TIMEOUT_MS: '',
        REJECT_UNAUTHORIZED: true,
        FOLLOWLOCATION: true,
        MAXREDIRS: -1,
        HTTP_VERSION: 'V2Tls'
      },
      meta: {
        name: 'Untitled Request',
        description: '',
        active_auth: 'no_auth',
        active_body: '',
        type: RequestTypes.REST,
        version: '1.0'
      },
      _meta: {
        uuid: uuid(),
        project_uuid: '',
        module_uuid: ''
      }
    }

    // Prepare body payload
    const _body = this.transformRequestBody(body, header['Content-Type'] || header['content-type'])

    restRequest.body = _body

    /* restRequest.bodies = {
      [_body._meta.uuid]: _body
    }

    // Set active body
    restRequest.meta.active_body = _body._meta.uuid

    restRequest.bodies[restRequest.meta.active_body]._meta.request_uuid = restRequest._meta.uuid

    // Add body_types, response in body if not exist
    if (isValidObject(restRequest.bodies)) {
      for (const leafUUID in restRequest.bodies) {
        if (
          !restRequest.bodies[leafUUID].body
          || !isValidObject(restRequest.bodies[leafUUID].body)
        ) {
          restRequest.bodies[leafUUID].body = _cloneDeep(BodyState)
        }
        else {
          restRequest.bodies[leafUUID].body = _merge(_cloneDeep(BodyState), restRequest.bodies[leafUUID].body)
        }

        if (!restRequest.bodies[leafUUID]?.meta?.active_body_type)
          restRequest.bodies[leafUUID].meta.active_body_type = 'no_body'
      }
    } */

    // Merge auth state for populate request
    restRequest.auth = _merge(_cloneDeep(AuthState), restRequest.auth)

    return restRequest
  }
}