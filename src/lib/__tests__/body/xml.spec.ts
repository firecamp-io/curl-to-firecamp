import { CurlToFirecamp } from '../../CurlToFirecamp'
import xmlRequest from "./__mocks__/xml"

describe('Sending xml data with content-type', () => {
    it('should generate request with body and content-type', () => {
        const request = new CurlToFirecamp('curl -d \'<language>xml</language>\' -H "Content-Type: application/xml" -X POST http://localhost:3000/data').transform()

        // Body id to remove
        const bodyUUID = Object.keys(request.bodies)[0]

        request.headers[0].id = xmlRequest.headers[0].id

        request.bodies[Object.keys(xmlRequest.bodies)[0]] = request.bodies[bodyUUID]

        delete request.bodies[bodyUUID]

        request.meta.active_body = Object.keys(xmlRequest.bodies)[0]

        expect(request).toMatchObject(xmlRequest)
    })
})