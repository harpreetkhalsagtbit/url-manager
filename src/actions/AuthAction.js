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

function isUserAlreadyLoggedIn() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var token = localStorage.getItem("token")
            if (token) {
                $.ajax({
                    type: "POST",
                    "async": true,
                    "crossDomain": true,
                    "url": "http://172.16.1.120:1212/api/verify-token",
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
        }, 1000);
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
        setTimeout(() => {
        	$.ajax({
        	    type: "POST",
        	    "async": true,
        	    "crossDomain": true,
        	    "url": "http://172.16.1.120:1212/api/login",
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
        }, 1000);
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
