
import parseCurl from 'parse-curl'
import { parse } from 'querystring'
import { constants, table } from '@firecamp/utility'
import { url as _url } from '@firecamp/url'
import { nanoid as uuid } from "nanoid"
import { ICurlToFirecamp, IRestLeaf, ITableRow } from './CurlToFirecamp.interface'

const { RequestTypes } = constants

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

  transformRequestBody(body: string, contentType: string): IRestLeaf {
    switch (contentType) {
      case 'application/json': return {
        'name': 'Default',
        'meta': {
          'is_default': true,
          'active_body_type': contentType
        },
        'body': {
          [contentType]: {
            'value': body || '',
            'headers': []
          }
        }
      }

      case 'application/x-www-form-urlencoded': const _body = {
        'name': 'Default',
        'meta': {
          'is_default': true,
          'active_body_type': contentType
        },
        'body': {
          'application/x-www-form-urlencoded': {
            'value': [],
            'headers': []
          }
        }
      }

        _body.body['application/x-www-form-urlencoded'].value = this.querystringToTable(body || '')

        return _body

      default: return {
        'name': 'Default',
        'meta': {
          'is_default': true,
          'active_body_type': 'no_body'
        },
        'body': ''
      }
    }
  }

  transform(): any {
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
        active_body: uuid(),
        type: RequestTypes.REST,
        version: '1.0'
      }
    }

    // Prepare bodies payload
    restRequest.bodies = {
      [restRequest.meta.active_body]: this.transformRequestBody(body, header['Content-Type'] || header['content-type'])
    }

    return restRequest
  }
}