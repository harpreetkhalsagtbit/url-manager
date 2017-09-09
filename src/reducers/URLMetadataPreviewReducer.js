import * as types from '../actions/actionTypes';
// import initialState from './initialState';

const initialState = {
	urlMetadataPreview: {}
}

export default function urlMetadataReducer(state = initialState.urlMetadataPreview, action) {
	// console.log(action, types)
	switch (action.type) {
		case types.PREVIEW_URL_SUCCESS:
			return Object.assign({}, action.url)

		default:
			return state;
	}
}