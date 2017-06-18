import 'whatwg-fetch';

var defaultParams = {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

export function get(url) {
    return fetch(url, defaultParams);
}

export function post(url, content) {
    return fetch(url, {
        ...defaultParams,
        method: 'POST',
        body: JSON.stringify(content)
    });
}

export function put() {

}

export function patch(url, content) {
    return fetch(url, {
        ...defaultParams,
        method: 'PATCH',
        body: JSON.stringify(content)
    });
}

export function remove(url) {
    return fetch(url, {
        ...defaultParams,
        method: 'DELETE'
    });
}