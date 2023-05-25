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

export async function fetchAPI(endpoint: string, data: object = {}, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'POST'): Promise<any> {
    const response = await fetch(Config.API_URL + endpoint, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: (method === 'POST' || method === 'PUT') ? JSON.stringify(data) : undefined
    });
    const json = await response.json();
    if (json.errors !== undefined && json.errors !== null) {
        throw new APIError(json as APIResponseError);
    }
    return json;
}