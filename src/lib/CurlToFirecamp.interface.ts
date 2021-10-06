export interface ITableRow {
    key: string
    value: string
    id: string
    disable: boolean
    type?: 'text' | 'file'
}

export interface IRestLeaf {
    name: string
    meta: {
        is_default?: boolean
        active_body_type: string
    }
    body: any
}

export interface ICurlToFirecamp {

    /**
     * Convert query string into the Firecamp table row 
     * 
     * @param queryString 
     */
    querystringToTable(queryString: string): Array<ITableRow>

    /**
     * Transform body payload into the Firecamp REST request
     * leaf payload
     * 
     * @param body 
     * @param contentType 
     */
    transformRequestBody(body: string, contentType: string): IRestLeaf

    /**
     * Return firecamp REST request populated request payload
     */
    transform(): any
}