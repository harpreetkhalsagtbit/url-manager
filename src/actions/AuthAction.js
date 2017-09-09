import * as config from '../config';
import * as types from './actionTypes';
import $ from 'jquery';

export function authFailed(response) {
    return {
        type: types.AUTH_FAILED,
        "isLoggedIn": false,
        "response": response
    };
}

export function authSuccess(status) {
    var isLoggedIn = status;
    return {
        type: types.AUTH_SUCCESS,
        "isLoggedIn": isLoggedIn
    };
}

export function logoutSuccess() {
    return {
        type: types.LOGOUT_SUCCESS,
        "isLoggedIn": false
    };
}

export function signUpSuccess(status) {
    var isLoggedIn = status;
    return {
        type: types.SIGN_UP_SUCCESS,
        "signUpStatus": true
    };
}

function isUserAlreadyLoggedIn() {
    return new Promise((resolve, reject) => {
        var token = localStorage.getItem("token")
        if (token) {
            $.ajax({
                type: "POST",
                "async": true,
                "crossDomain": true,
                "url": config.HOST + ":" + config.PORT + "/api/verify-token",
                "method": "POST",
                "headers": {
                    "content-type": "application/x-www-form-urlencoded",
                    // "cache-control": "no-cache",
                },
                "data": {
                    "token": token,
                },
                success: function(data, status, response) {
                    console.log("token success", data, response)
                    resolve({
                        statusCode: response.status,
                        message: response.statusText,
                        token: data.token
                    })
                },
                error: function(request, status, error) {
                    console.log("error", request, error)
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

export function checkAuthStatus() {
    return dispatch => {
        return isUserAlreadyLoggedIn().then(response => {
            if (response.statusCode === 200) {
                return dispatch(authSuccess(true))
            }
        }).catch(error => {
            return dispatch(authFailed({}))
        });
    };
}

function authenticateUserCredentials(logInDetails) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            "async": true,
            "crossDomain": true,
            "url": config.HOST + ":" + config.PORT + "/api/login",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                // "cache-control": "no-cache",
            },
            "data": {
                "email": logInDetails.username,
                "password": logInDetails.password
            },
            success: function(data, status, response) {
                resolve({
                    statusCode: response.status,
                    message: response.statusText,
                    token: data.token
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
export const verifyLogIn = (logInDetails) => {
    return dispatch => {
        return authenticateUserCredentials(logInDetails).then(response => {
            if (response.statusCode === 200) {
                localStorage.setItem("token", response.token)
                return dispatch(authSuccess(true))
            }
        }).catch(error => {
            if (error.errorCode === 400) {
                return dispatch(authFailed(error))
            }
        });
    };
}

function signUpNewUser(signUpDetails) {
    return new Promise((resolve, reject) => {

        $.ajax({
            type: "POST",
            "async": true,
            "crossDomain": true,
            "url": config.HOST + ":" + config.PORT + "/api/signup",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                // "cache-control": "no-cache",
            },
            "data": {
                "email": signUpDetails.username,
                "password": signUpDetails.password
            },
            success: function(data, status, response) {
                resolve({
                    statusCode: response.status,
                    message: response.statusText,
                    data: data
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

export const signUpSubmit = (signUpDetails) => {
    return dispatch => {
        return signUpNewUser(signUpDetails).then(response => {
            if (response.statusCode === 200) {
                if(response.data.logIn == "sign up success") {
                    return dispatch(signUpSuccess(true))
                }
            }
        }).catch(error => {
            if (error.errorCode === 400) {
                return dispatch(authFailed(error))
            }
        });
    };
}

function logoutMe(signUpDetails) {
    return new Promise((resolve, reject) => {
        localStorage.setItem("token","")
        resolve(true)
    });

}

export const logout = () => {
    return dispatch => {
        return logoutMe().then(logout => {
            if (logout) {
                return dispatch(logoutSuccess())
            }
        }).catch(error => {
            if (error.errorCode === 400) {
                return dispatch(authFailed(error))
            }
        });
    };
}
