import { CurlToFirecamp } from '../../CurlToFirecamp'
import requestWithQuery from "./__mocks__"

describe('Sending request with query', () => {
    it('should generate request with query', () => {
        const request = new CurlToFirecamp('curl http://localhost:3000/?id=1&user=sri').transform()

        // Body id to remove
        const bodyUUID = Object.keys(request.bodies)[0]

        request.url.query_params[0].id = requestWithQuery.url.query_params[0].id
        
        request.url.query_params[1].id = requestWithQuery.url.query_params[1].id

        request.bodies[Object.keys(requestWithQuery.bodies)[0]] = request.bodies[bodyUUID]

        delete request.bodies[bodyUUID]

        request.meta.active_body = Object.keys(requestWithQuery.bodies)[0]

        expect(request).toMatchObject(requestWithQuery)
    })
})