export const AUTH_TYPES = {
    BEARER: 'bearer',
    BASIC: 'basic',
    DIGEST: 'digest',
    OAUTH1: 'oauth1',
    OAUTH2: 'oauth2',
    AWS: 'aws',
    HAWK: 'hawk',
    NTLM: 'ntlm',
    NO_AUTH: 'no_auth',
    INHERIT: 'inherit'
}

export const BODY_TYPES = {
    MULTIPART: 'multipart/form-data',
    FORM_URL_ENCODE: 'application/x-www-form-urlencoded',
    GRAPHLQL_QUERIES: 'application/graphql',
    JSON: 'application/json',
    JAVASCRIPT: 'application/javascript',
    XML: 'application/xml',
    XML_TEXT: 'text/xml',
    HTML: 'text/html',
    TEXT: 'text',
    TEXT_PLAIN: 'text/plain',
    BINARY: 'binary',
    PROTOCOL_BUFFER: 'protocol_buffer',
    NO_BODY: 'noBody',
}