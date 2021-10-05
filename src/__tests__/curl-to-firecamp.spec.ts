// import  from 'jest';

import { CurlToFirecamp } from '../lib';


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
    const curl = `curl --request POST \
      --url https://jsonplaceholder.typicode.com/posts \
      --header 'Content-Type: application/json' \
      --data '{ "userId": 1, "id": 1 }'`;

    const expectedJSON = {
      "method": "POST",
      "header": {
        "Content-Type": "application/json",
      },
      "url": "https://jsonplaceholder.typicode.com/posts",
      "body": '{ "userId": 1, "id": 1 }'
    }
    const expectedFirecamp = {
      "url": "https://jsonplaceholder.typicode.com/posts",
      "method": "POST",
      "headers": [
        { "name": "Content-Type", "value": "application/json" }
      ],
      "bodies": [{
        "name": "Default",
        "active_type": "application/json",
        "body_types": {
          "application/json": {
            "value": '{ "userId": 1, "id": 1 }'
          }
        }
      }]
    }

    let parsedCurl = new CurlToFirecamp(curl);
    expect(parsedCurl.toJSON()).toStrictEqual(expectedJSON);
    expect(parsedCurl.transform()).toStrictEqual(expectedFirecamp);
  })

  test("should transform urlencoded body", () => {
    const curl = `curl --request POST \
      --url https://jsonplaceholder.typicode.com/posts \
      --header 'content-type: application/x-www-form-urlencoded' \
      --data name=Ratan \
      --data surname=Tata`;

    const expectedJSON = {
      "method": "POST",
      "header": {
        "content-type": "application/x-www-form-urlencoded",
      },
      "url": "https://jsonplaceholder.typicode.com/posts",
      "body": 'name=Ratan&surname=Tata'
    }
    const expectedFirecamp = {
      "url": "https://jsonplaceholder.typicode.com/posts",
      "method": "POST",
      "headers": [
        { "name": "content-type", "value": "application/x-www-form-urlencoded" }
      ],
      "bodies": [{
        "name": "Default",
        "active_type": "application/x-www-form-urlencoded",
        "body_types": {
          "application/x-www-form-urlencoded": {
            "value": 'name=Ratan&surname=Tata'
          }
        }
      }]
    }

    let parsedCurl = new CurlToFirecamp(curl);
    expect(parsedCurl.toJSON()).toStrictEqual(expectedJSON);
    expect(parsedCurl.transform()).toStrictEqual(expectedFirecamp);
  })

});
