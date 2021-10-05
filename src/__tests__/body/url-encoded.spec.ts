import { CurlToFirecamp } from "../../";

describe('Sending url-encoded data without content-type', () => {
    it('should generate request with body and content-type', () => {
        const request = new CurlToFirecamp('curl -d "param1=value1&param2=value2" -X POST http://localhost:3000/data').transform()

        console.log(request);

        expect(request).toBeDefined()
        
    })
})