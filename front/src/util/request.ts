import Config from '../config';

export interface APIResponseError {
    errors: object[]
};

export class APIError {
    response: APIResponseError;
    constructor(response: APIResponseError) {
        this.response = response;
    }
};

export async function fetchAPI(endpoint: string, data: any = {}, method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'FORM' = 'POST'): Promise<any> {
    let body = undefined;
    let headers = undefined;
    if (method === 'POST' || method == 'PUT') {
        body = JSON.stringify(data);
        headers = {
            'Content-Type': 'application/json'
        };
    } else if (method === 'FORM') {
        method = 'POST';
        body = new FormData();
        for (const key in data) {
            console.log('setting', key, data[key]);
            body.append(key, data[key] as string | Blob);
        }
    }
    const response = await fetch(Config.API_URL + endpoint, {
        method,
        headers,
        credentials: 'include',
        body
    });
    const json = await response.json();
    if (json.errors !== undefined && json.errors !== null) {
        throw new APIError(json as APIResponseError);
    }
    return json;
}