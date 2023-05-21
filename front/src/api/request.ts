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

export async function fetchAPI(endpoint: string, data: object = {}, method: 'GET' | 'POST' = 'GET'): Promise<object> {
    const response = await fetch(Config.API_URL + endpoint, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        // FIXME: não funciona com GET, tem que usar urlqueryparams ou sla como era
        body: JSON.stringify(data)
    });
    const json = await response.json();
    if (json.errors !== undefined && json.errors !== null) {
        throw new APIError(json as APIResponseError);
    }
    return json;
}