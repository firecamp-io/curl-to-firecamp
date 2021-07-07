
import parsedCurl from "parse-curl";
/**
 * Transform curl request to Firecamp request
 *
 * @returns a Promise
 */
export class CurlToFirecamp {

  private curlJSON: any;
  constructor(curl: string) {
    this.curlJSON = parsedCurl(curl)
  }

  transform() {
    let { url, method, header = {}, body } = this.curlJSON;
    let fcFormat: any = {
      url,
      method,
      headers: Object.keys(header).map(k => ({ name: k, value: header[k] }))
    }
    if (body) {
      fcFormat.bodies = [this.transformBody(body, header["Content-Type"] || header["content-type"])];
    }
    return fcFormat;
  }

  transformBody(body: string, contentType: string) {
    if (!body) return undefined;
    if (contentType.includes("application/json")) {
      return {
        "name": "Default",
        "active_type": "application/json",
        "body_types": {
          "application/json": {
            "value": '{ "post_id": 123  }'
          }
        }
      }
    }
    return undefined;
  }

  toJSON() {
    return this.curlJSON;
  }
}

