# curl-to-firecamp

Transform curl request format to Firecamp request format.

## TODO
- [ ] Add dependency `@firecamp/url`
- [ ] Add test cases

## Usage
```ts
import { CurlToFirecamp } from '@firecamp/curl-to-firecamp'

const curl = `curl --request POST \
      --url https://jsonplaceholder.typicode.com/posts \
      --header 'content-type: application/x-www-form-urlencoded' \
      --data name=Ratan \
      --data surname=Tata`;

const request = new CurlToFirecamp(curl).transform();

console.log(request)
```