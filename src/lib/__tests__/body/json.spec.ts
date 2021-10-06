import { CurlToFirecamp } from '../../CurlToFirecamp'
import jsonRequest from "./__mocks__/json"

describe('Sending json data with content-type', () => {
    it('should generate request with body and content-type', () => {
        const request = new CurlToFirecamp('curl -d \'{"key1":"value1", "key2":"value2"}\' -H "Content-Type: application/json" -X POST http://localhost:3000/data').transform()

        // Body id to remove
        const bodyUUID = Object.keys(request.bodies)[0]

        request.headers[0].id = jsonRequest.headers[0].id

        request.bodies[Object.keys(jsonRequest.bodies)[0]] = request.bodies[bodyUUID]

        delete request.bodies[bodyUUID]

        request.meta.active_body = Object.keys(jsonRequest.bodies)[0]

        expect(request).toMatchObject(jsonRequest)
    })
})