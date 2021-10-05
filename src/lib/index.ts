
import parseCurl from 'parse-curl'
import { parse } from 'querystring'
import { constants, table } from '@firecamp/utility'
import { url as _url } from '@firecamp/url'
import { nanoid as uuid } from 'nano-id'
import { ICurlToFirecamp, IRestLeaf, ITableRow } from './index.d'

const { RequestTypes } = constants

export class CurlToFirecamp implements ICurlToFirecamp {

  private curlJSON: any

  constructor(curl: string) {
    this.curlJSON = parseCurl(curl)
  }

  querystringToTable(queryString: string): Array<ITableRow> {
    try {
      const queryObject = parse(queryString)

      return table.objToTable(queryObject)
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

      case 'application/x-www-form-urlencoded': return {
        'name': 'Default',
        'meta': {
          'is_default': true,
          'active_body_type': contentType
        },
        'body': {
          'application/json': {
            'value': this.querystringToTable(body || ''),
            'headers': []
          }
        }
      }

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
      headers: table.objToTable(header),
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