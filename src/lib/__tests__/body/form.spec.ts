import { CurlToFirecamp } from '../../CurlToFirecamp'
import formDataRequest from "./__mocks__/form"

describe('Sending form data without content-type', () => {
    it('should generate request with body and content-type', () => {
        const request = new CurlToFirecamp('curl -F \'param1=value1\' -F \'param2=value2\' -X POST http://localhost:3000/data').transform()

        // Body id to remove
        const bodyUUID = Object.keys(request.bodies)[0]

        request.headers[0].id = formDataRequest.headers[0].id

        request.bodies[Object.keys(formDataRequest.bodies)[0]] = request.bodies[bodyUUID]

        delete request.bodies[bodyUUID]

        request.meta.active_body = Object.keys(formDataRequest.bodies)[0]

        request.bodies[Object.keys(formDataRequest.bodies)[0]].body['multipart/form-data'].value.forEach(row => {
            row.id = formDataRequest.bodies[Object.keys(formDataRequest.bodies)[0]].body['multipart/form-data'].value.filter(_row =>
                _row.key === row.key
            )[0].id
        })

        expect(request).toMatchObject(formDataRequest)
    })
})

describe('Sending form data data with content-type', () => {
    it('should generate request with body and content-type', () => {
        const request = new CurlToFirecamp('curl -F \'param1=value1\' -F \'param2=value2\' -H \'Content-Type: multipart/form-data\' -X POST http://localhost:3000/data').transform()

        // Body id to remove
        const bodyUUID = Object.keys(request.bodies)[0]

        request.headers[0].id = formDataRequest.headers[0].id

        request.bodies[Object.keys(formDataRequest.bodies)[0]] = request.bodies[bodyUUID]

        delete request.bodies[bodyUUID]

        request.meta.active_body = Object.keys(formDataRequest.bodies)[0]

        request.bodies[Object.keys(formDataRequest.bodies)[0]].body['multipart/form-data'].value.forEach(row => {
            row.id = formDataRequest.bodies[Object.keys(formDataRequest.bodies)[0]].body['multipart/form-data'].value.filter(_row =>
                _row.key === row.key
            )[0].id
        })

        expect(request).toMatchObject(formDataRequest)
    })
})