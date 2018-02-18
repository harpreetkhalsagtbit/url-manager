import * as config from '../config';
import * as types from './actionTypes';
import $ from 'jquery';

export function previewUrlSuccess(url) {
    console.log("url", url)
    return { type: types.PREVIEW_URL_SUCCESS, url};
}

export function previewUrlHide() {
    return { type: types.PREVIEW_URL_HIDE};
}

function previewMetaDataURL(urlForm) {
    return new Promise((resolve, reject) => {
        var token = localStorage.getItem("token")
        if (token) {
            $.ajax({
                type: "PUT",
                "async": true,
                "crossDomain": true,
                "url": config.HOST + ":" + config.PORT + "/api/urlScrapperPreview?token=" + token,
                "method": "PUT",
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

export const previewURL = (id) => {
    return dispatch => {
        console.log(id)
        return previewMetaDataURL(id).then(response => {
            if (response.statusCode === 200) {
                return dispatch(previewUrlSuccess(response))
            }
        }).catch(error => {
            return "dispatch(authFailed({}))"
        });
    };

}

export const previewURLHide = (id) => {
    return dispatch => {
        console.log(id)
        return dispatch(previewUrlHide())
    };

}
