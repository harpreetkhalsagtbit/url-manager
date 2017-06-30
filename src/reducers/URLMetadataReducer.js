import * as types from '../actions/actionTypes';
// import initialState from './initialState';

const initialState = {
	data: []
}

export default function urlMetadataReducer(state = initialState, action) {
	// console.log(action.type)
	switch (action.type) {
		case types.LOAD_URL_SUCCESS:
			return action.data;

		default:
			return state;
	}
}