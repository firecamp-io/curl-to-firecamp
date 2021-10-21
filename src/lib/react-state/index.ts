import { AUTH_TYPES, BODY_TYPES } from '../constants'

export const AuthState = {
  [AUTH_TYPES.BEARER]: {
    token: '',
    prefix: '',
  },
  [AUTH_TYPES.BASIC]: {
    password: '',
    username: '',
  },
  [AUTH_TYPES.DIGEST]: {
    password: '',
    username: '',
    realm: '',
    nonce: '',
    algorithm: '',
    qop: '',
    nonce_count: '',
    client_nonce: '',
    opaque: '',
  },
  [AUTH_TYPES.OAUTH1]: {
    consumer_key: '',
    consumer_secret: '',
    token_key: '',
    token_secret: '',
    signature_method: '',
    timestamp: '',
    nonce: '',
    version: '',
    realm: '',
    verifier: '',
    callback_URL: '',
  },
  [AUTH_TYPES.OAUTH2]: {
    active_grant_type: 'code',
    grant_types: {
      code: {
        grant_type: 'code',
        callback: '',
        auth_url: '',
        access_token_url: '',
        client_id: '',
        client_secret: '',
        scope: '',
        state: '',
      },
      implicit: {
        grant_type: 'implicit',
        callback: '',
        auth_url: '',
        client_id: '',
        scope: '',
        state: '',
      },
      password: {
        grant_type: 'password',
        access_token_url: '',
        username: '',
        password: '',
        client_id: '',
        client_secret: '',
        scope: '',
      },
      client_credentials: {
        grant_type: 'client_credentials',
        access_token_url: '',
        client_id: '',
        client_secret: '',
        scope: '',
      },
    },
  },
  [AUTH_TYPES.HAWK]: {
    id: '',
    key: '',
    algorithm: '',
    user: '',
    nonce: '',
    extra_data: '',
    app_id: '',
    delegation: '',
    timestamp: '',
  },
  [AUTH_TYPES.AWS]: {
    access_key: '',
    secret_key: '',
    region: '',
    service: '',
    session_token: '',
  },
  [AUTH_TYPES.NTLM]: {
    password: '',
    username: '',
    domain: '',
    workstation: '',
  },
}

export const BodyState = {
  [BODY_TYPES.MULTIPART]: {
    value: [],
    headers: [],
  },
  [BODY_TYPES.FORM_URL_ENCODE]: {
    value: [],
    headers: [],
  },
  [BODY_TYPES.GRAPHLQL_QUERIES]: {
    value: '',
    variables: '',
    headers: [],
  },
  [BODY_TYPES.JSON]: {
    value: '',
    headers: [],
  },
  [BODY_TYPES.JAVASCRIPT]: {
    value: '',
    headers: [],
  },
  [BODY_TYPES.XML]: {
    value: '',
    headers: [],
  },
  [BODY_TYPES.XML_TEXT]: {
    value: '',
    headers: [],
  },
  [BODY_TYPES.HTML]: {
    value: '',
    headers: [],
  },
  [BODY_TYPES.TEXT]: {
    value: '',
    headers: [],
  },
  [BODY_TYPES.TEXT_PLAIN]: {
    value: '',
    headers: [],
  },
  [BODY_TYPES.BINARY]: {
    value: '',
    headers: [],
  },
  [BODY_TYPES.PROTOCOL_BUFFER]: {
    value: '',
    encoded_msg_type: '',
    decoded_msg_type: '',
    headers: [],
    proto_file_path: '',
    encoded_file_path: '',
    decoded_file_path: '',
  },
}
