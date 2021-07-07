// import  from 'jest';

import { CurlToFirecamp } from './curl-to-firecamp';


describe('Transform', () => {

  test('should transform headers', () => {

    const curl = `curl 'http://google.com/' \
    -H 'Accept-Encoding: gzip, deflate, sdch' \
    -H 'Accept-Language: en-US,en;q=0.8,da;q=0.6' \
    -H 'Upgrade-Insecure-Requests: 1' \
    --compressed`;
    const expectedJSON = {
      "method": "GET",
      "header": {
        "Accept-Encoding": "gzip, deflate, sdch",
        "Accept-Language": "en-US,en;q=0.8,da;q=0.6",
        "Upgrade-Insecure-Requests": "1"
      },
      "url": "http://google.com/"
    }
    const expectedFirecamp = {
      "url": "http://google.com/",
      "method": "GET",
      "headers": [
        { "name": "Accept-Encoding", "value": "gzip, deflate, sdch" },
        { "name": "Accept-Language", "value": "en-US,en;q=0.8,da;q=0.6" },
        { "name": "Upgrade-Insecure-Requests", "value": "1" }
      ]
    }

    let parsedCurl = new CurlToFirecamp(curl);
    expect(parsedCurl.toJSON()).toStrictEqual(expectedJSON);
    expect(parsedCurl.transform()).toStrictEqual(expectedFirecamp);
  });

  test("should transform json body", () => {
    const curl = `curl 'http://google.com/' \
    -H 'Content-Type: application/json' \
    --data "{ "post_id": 123  }"`;

    const expectedJSON = {
      "method": "POST",
      "header": {
        "Content-Type": "application/json",
      },
      "url": "http://google.com/",
      "body": "{ post_id: 123  }"
    }
    const expectedFirecamp = {
      "url": "http://google.com/",
      "method": "POST",
      "headers": [
        { "name": "Content-Type", "value": "application/json" }
      ],
      "bodies": [{
        "name": "Default",
        "active_type": "application/json",
        "body_types": {
          "application/json": {
            "value": '{ "post_id": 123  }'
          }
        }
      }]
    }

    let parsedCurl = new CurlToFirecamp(curl);
    expect(parsedCurl.toJSON()).toStrictEqual(expectedJSON);
    expect(parsedCurl.transform()).toStrictEqual(expectedFirecamp);
  })

});
