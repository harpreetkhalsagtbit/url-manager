import * as types from '../actions/actionTypes';
// import initialState from './initialState';

const initialState = {
	urlList: []
}

export default function urlMetadataReducer(state = initialState.urlList, action) {
	// console.log(action, types)
	switch (action.type) {
		case types.LOGOUT_SUCCESS:
			return initialState.urlList;

		case types.LOAD_URL_SUCCESS:
			return action.urlList;

		case types.ADD_URL_SUCCESS:
			return [
				...state,
				Object.assign({}, action.url)
			];

		case types.DELETE_URL_SUCCESS:
			return state.filter(url => {
				return (url._id !== action.id)
			})

		case types.UPDATE_URL_SUCCESS:
			return [
				...state.filter(url => url._id !== action.url._id),
				Object.assign({}, action.url)
			];

		default:
			return state;
	}
}