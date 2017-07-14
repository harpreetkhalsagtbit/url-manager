import * as config from '../config';
import * as types from './actionTypes';
import $ from 'jquery';


export function loadAllUrls(data) {
    return {
        type: types.LOAD_URL_SUCCESS,
        "urlList": data.urls
    };
}

export function addUrlSuccess(url) {
    console.log("ADD_URL_SUCCESS", url)
    return { type: types.ADD_URL_SUCCESS, url};
}

export function updateUrlSuccess(url) {
    console.log("UPDATE_URL_SUCCESS", url)
    return { type: types.UPDATE_URL_SUCCESS, url};
}

export function deleteUrlSuccess(id) {
    return { type: types.DELETE_URL_SUCCESS, id};
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
        var token = localStorage.getItem("token")
        if (token) {
            $.ajax({
                type: 'GET',
                url: config.HOST + ":" + config.PORT + "/api/urls?token=" + token,
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
        } else {
            reject({
                errorCode: 403,
                error: "auth Failed"
            })
        }
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
        var token = localStorage.getItem("token")
        if (token) {
            $.ajax({
                type: "POST",
                "async": true,
                "crossDomain": true,
                "url": config.HOST + ":" + config.PORT + "/api/urlScrapper?token=" + token,
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
                        url:response.responseJSON,
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
        } else {
            reject({
                errorCode: 403,
                error: "auth Failed"
            })
        }
    });

}
export const saveURL = (urlForm) => {
    return dispatch => {
        console.log(urlForm)
        return addURL(urlForm).then(response => {
            if (response.statusCode === 200) {
                return dispatch(addUrlSuccess(response.url))
            }
        }).catch(error => {
            return "dispatch(authFailed({}))"
        });
    };

}

function updateURL(urlForm) {
    return new Promise((resolve, reject) => {
        var token = localStorage.getItem("token")
        if (token) {
            $.ajax({
                type: "PUT",
                "async": true,
                "crossDomain": true,
                "url": config.HOST + ":" + config.PORT + "/api/urlScrapper?token=" + token,
                "method": "PUT",
                "headers": {
                    "content-type": "application/x-www-form-urlencoded",
                    // "cache-control": "no-cache",
                },
                "data": {
                    "id": urlForm.id,
                    "url": urlForm.url
                },
                success: function(data, status, response) {
                    console.log(response)
                    resolve({
                        url:response.responseJSON,
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
        } else {
            reject({
                errorCode: 403,
                error: "auth Failed"
            })
        }
    });

}
export const editURL = (urlForm) => {
    return dispatch => {
        console.log(urlForm)
        return updateURL(urlForm).then(response => {
            if (response.statusCode === 200) {
                return dispatch(updateUrlSuccess(response.url))
            }
        }).catch(error => {
            return "dispatch(authFailed({}))"
        });
    };

}

function deleteURL(id) {
    return new Promise((resolve, reject) => {
        var token = localStorage.getItem("token")
        if (token) {
            $.ajax({
                type: "DELETE",
                "async": true,
                "crossDomain": true,
                "url": config.HOST + ":" + config.PORT + "/api/urlScrapper/" + id + "?token=" + token,
                "method": "DELETE",
                "headers": {
                    "content-type": "application/x-www-form-urlencoded",
                    // "cache-control": "no-cache",
                },
                success: function(data, status, response) {
                    console.log(data, status,  response)
                    resolve({
                        id:id,
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
        } else {
            reject({
                errorCode: 403,
                error: "auth Failed"
            })
        }
    });

}

export const removeURL = (id) => {
    return dispatch => {
        console.log(id)
        return deleteURL(id).then(response => {
            if (response.statusCode === 200) {
                return dispatch(deleteUrlSuccess(response.id))
            }
        }).catch(error => {
            return "dispatch(authFailed({}))"
        });
    };

}
