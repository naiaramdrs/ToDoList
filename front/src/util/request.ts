import { useHistory } from 'react-router';
import Config from '../config';

export interface APIResponseError {
    errors?: any[]
    code?: string
    message?: string
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
    if (response.status !== 200) {
        if (json?.errors?.[0]?.message?.startsWith('E_INVALID_AUTH_SESSION')) {
            window.location.href = '/login';
        }
        throw new APIError(json as APIResponseError);
    }
    return json;
}