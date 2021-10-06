import { CurlToFirecamp } from '../../CurlToFirecamp'
import basicAuthRequest from "./__mocks__/basic"

describe('Sending request with basic auth', () => {
    it('should generate request with Authorization header', () => {
        const request = new CurlToFirecamp('curl -u username:password http://localhost:3000/data').transform()

        // Body id to remove
        const bodyUUID = Object.keys(request.bodies)[0]

        request.headers[0].id = basicAuthRequest.headers[0].id

        request.bodies[Object.keys(basicAuthRequest.bodies)[0]] = request.bodies[bodyUUID]

        delete request.bodies[bodyUUID]

        request.meta.active_body = Object.keys(basicAuthRequest.bodies)[0]

        expect(request).toMatchObject(basicAuthRequest)
    })
})