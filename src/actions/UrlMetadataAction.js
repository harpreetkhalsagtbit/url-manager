import * as types from './actionTypes';
import $ from 'jquery';


export function loadAllUrls(data) {
    return {
        type: types.LOAD_URL_SUCCESS,
        "data": data.urls
    };
}

// export function checkAuthStatus() {
// return dispatch => {
// 	return AuthorApi.getAllAuthors().then(authors => {
// 		dispatch(loadAuthorsSuccess(authors));
// 	}).catch(error => {
// 		throw(error);
// 	});
// };
// }

function getAllUrls() {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'GET',
            url: "http://172.16.1.120:1212/api/urls",
            // beforeSend: function(xhr) {
            // 	xhr.setRequestHeader('Authorization', 'Basic ' + window.btoa(unescape(encodeURIComponent("harpreet" + ':' + "password"))))
            // },
            success: function(data, status, response) {
                // console.log(data)
                resolve({
                    statusCode: response.status,
                    urls: data,
                })
            },
            error: function(request, status, error) {
                console.log(error)
                reject({
                    errorCode: request.status,
                    error: error
                })
            }
        })
    });
}

export const loadURLsWithMeta = () => {
    return dispatch => {
        return getAllUrls().then(response => {
            if (response.statusCode === 200) {
                return dispatch(loadAllUrls(response))
            }
        }).catch(error => {
            return "dispatch(authFailed({}))"
        });
    };
}

function addURL(urlForm) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            "async": true,
            "crossDomain": true,
            "url": "http://172.16.1.120:1212/api/urlScrapper",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                // "cache-control": "no-cache",
            },
            "data": {
                "url": urlForm.url
            },
            success: function(data, status, response) {
                console.log(response)
                resolve({
                    statusCode: response.status,
                    message: response.statusText
                })
            },
            error: function(request, status, error) {
                reject({
                    errorCode: request.status,
                    error: error
                })
            }
        })
    });

}
export const saveURL = (urlForm) => {
    return dispatch => {
        console.log(urlForm)
        return addURL(urlForm).then(response => {
            if (response.statusCode === 200) {
                return dispatch(loadURLsWithMeta())
            }
        }).catch(error => {
            return "dispatch(authFailed({}))"
        });
    };

}
