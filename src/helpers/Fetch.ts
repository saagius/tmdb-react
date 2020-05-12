import {
    getBasePath,
    getApiKey
} from './Domain';

async function request(url: string, params: any = {}, needsAuth = true, method = 'GET') {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const hasInitialisedParams = Object.keys(params).length > 0;

    if (method === 'GET') {
        if(needsAuth) {
            params.api_key = getApiKey();
        }

        if(!hasInitialisedParams) {
            url += '?' + objectToQueryString(params);
            delete params.api_key;
        }
    }
    else {
        if(needsAuth) {
            url += '?' + objectToQueryString({
                api_key: getApiKey()
            });
        }
    }
  
    if (hasInitialisedParams) {
        if (method === 'GET') {
            url += '?' + objectToQueryString(params);
        } 
        else {
            options.body = JSON.stringify(params);
        }
    }
  
    const response = await fetch(getBasePath() + url, options);
  
    if (response.status !== 200) {
      return generateErrorResponse('The server responded with an unexpected status.');
    }
  
    const result = await response.json();
  
    return result;
}
  
function objectToQueryString(obj: any) {
    return Object.keys(obj).map(key => key + '=' + obj[key]).join('&');
}
  
function generateErrorResponse(message: string) {
    return {
        status : 'error',
        message
    };
}
  
function get(url: string, params?: any, needsAuth: boolean = true) {
    return request(url, params, needsAuth);
}
  
function post(url: string, params?: any, needsAuth: boolean = true) {
    return request(url, params, needsAuth, 'POST');
}
  
function update(url: string, params?: any, needsAuth: boolean = true) {
    return request(url, params, needsAuth, 'PUT');
}
  
function remove(url: string, params?: any, needsAuth: boolean = true) {
    return request(url, params, needsAuth, 'DELETE');
}
  
export default {
    get,
    post,
    update,
    remove
};