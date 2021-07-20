
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

  transformRequestBody(body: string, contentType: string) {
    if (!body) return undefined;
    if (contentType.includes("application/json")) {
      return {
        "name": "Default",
        "active_type": contentType,
        "body_types": {
          "application/json": {
            "value": body
          }
        }
      }
    }
    if (contentType.includes("application/x-www-form-urlencoded")) {
      return {
        "name": "Default",
        "active_type": contentType,
        "body_types": {
          "application/x-www-form-urlencoded": {
            "value": body
          }
        }
      }
    }
    return undefined;
  }

  transform() {
    let { url, method, header = {}, body } = this.curlJSON;
    let fcFormat: any = {
      url,
      method,
      headers: Object.keys(header).map(k => ({ name: k, value: header[k] }))
    }
    if (body) {
      fcFormat.bodies = [this.transformRequestBody(body, header["Content-Type"] || header["content-type"])];
    }
    return fcFormat;
  }

  toJSON() {
    return this.curlJSON;
  }
}

// const curl = `curl --request POST \
//       --url https://jsonplaceholder.typicode.com/posts \
//       --header 'content-type: application/x-www-form-urlencoded' \
//       --data name=Ratan \
//       --data surname=Tata`;
// const transform = new CurlToFirecamp(curl).toJSON();
// console.log(transform, "transform")