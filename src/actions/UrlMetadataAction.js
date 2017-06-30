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


export const loadURLsWithMeta = () => {
	return dispatch => {

		var promise = new Promise(function(resolve, reject) {
			$.ajax({
				type: 'GET',
				url: "http://localhost:8080/api/urls",
				// beforeSend: function(xhr) {
				// 	xhr.setRequestHeader('Authorization', 'Basic ' + window.btoa(unescape(encodeURIComponent("harpreet" + ':' + "password"))))
				// },
				success: function(data, status, response) {
					// console.log(data)
					resolve({
						statusCode: response.status,
						urls:data,
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
		})

		return promise.then(function(data) {
				return dispatch(loadAllUrls(data))
			})
			.catch(function(response) {
				// console.log(response)
				if (response.errorCode === 400) {
					return "dispatch(authFailed(response))"
				}
			})
	}
}