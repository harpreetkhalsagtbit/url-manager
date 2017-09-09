import * as types from '../actions/actionTypes';
// import initialState from './initialState';

const initialState = {
	tagList: []
}

export default function tagReducer(state = initialState, action) {
	// console.log(action.type)
	switch (action.type) {
		case types.LOAD_TAG_SUCCESS:
			return action.tagList

		default:
			return state;
	}
}