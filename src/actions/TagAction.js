import * as config from '../config';
import * as types from './actionTypes';
import $ from 'jquery';


export function loadAllTagss(data) {
    return {
        type: types.LOAD_TAG_SUCCESS,
        "tagList": data.tags
    };
}

function getAllTags() {
    return new Promise((resolve, reject) => {
        var token = localStorage.getItem("token")
        if (token) {
            $.ajax({
                type: 'GET',
                url: config.HOST + ":" + config.PORT + "/api/tags?token=" + token,
                // beforeSend: function(xhr) {
                // 	xhr.setRequestHeader('Authorization', 'Basic ' + window.btoa(unescape(encodeURIComponent("harpreet" + ':' + "password"))))
                // },
                success: function(data, status, response) {
                    // console.log(data)
                    resolve({
                        statusCode: response.status,
                        tags: data,
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

export const loadTags = () => {
    return dispatch => {
        return getAllTags().then(response => {
            if (response.statusCode === 200) {
                return dispatch(loadAllTagss(response))
            }
        }).catch(error => {
            return "dispatch(authFailed({}))"
        });
    };
}
