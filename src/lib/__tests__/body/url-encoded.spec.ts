import { CurlToFirecamp } from '../../CurlToFirecamp'
import urlencodedRequest from "./__mocks__/url-encoded"

describe('Sending url-encoded data without content-type', () => {
    it('should generate request with body and content-type', () => {
        const request = new CurlToFirecamp('curl -d \'param1=value1&param2=value2\' -X POST http://localhost:3000/data').transform()

        // Body id to remove
        const bodyUUID = Object.keys(request.bodies)[0]

        request.headers[0].id = urlencodedRequest.headers[0].id

        request.bodies[Object.keys(urlencodedRequest.bodies)[0]] = request.bodies[bodyUUID]

        delete request.bodies[bodyUUID]

        request.meta.active_body = Object.keys(urlencodedRequest.bodies)[0]

        request.bodies[Object.keys(urlencodedRequest.bodies)[0]].body['application/x-www-form-urlencoded'].value.forEach(row => {
            row.id = urlencodedRequest.bodies[Object.keys(urlencodedRequest.bodies)[0]].body['application/x-www-form-urlencoded'].value.filter(_row =>
                _row.key === row.key
            )[0].id
        })

        expect(request).toMatchObject(urlencodedRequest)
    })
})

describe('Sending url-encoded data with content-type', () => {
    it('should generate request with body and content-type', () => {
        const request = new CurlToFirecamp('curl -d \'param1=value1&param2=value2\' -H \'Content-Type: application/x-www-form-urlencoded\' -X POST http://localhost:3000/data').transform()

        // Body id to remove
        const bodyUUID = Object.keys(request.bodies)[0]

        request.headers[0].id = urlencodedRequest.headers[0].id

        request.bodies[Object.keys(urlencodedRequest.bodies)[0]] = request.bodies[bodyUUID]

        delete request.bodies[bodyUUID]

        request.meta.active_body = Object.keys(urlencodedRequest.bodies)[0]

        request.bodies[Object.keys(urlencodedRequest.bodies)[0]].body['application/x-www-form-urlencoded'].value.forEach(row => {
            row.id = urlencodedRequest.bodies[Object.keys(urlencodedRequest.bodies)[0]].body['application/x-www-form-urlencoded'].value.filter(_row =>
                _row.key === row.key
            )[0].id
        })

        expect(request).toMatchObject(urlencodedRequest)
    })
})