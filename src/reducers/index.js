import { types } from '../sagas/fetchUsersSaga'

const { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS } = types;

const initialState = {
  users: []
}

export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_USERS_REQUEST:
			console.log(action);
			return { ...state };
		case FETCH_USERS_SUCCESS:
			console.log(action);
			return {
				...state,
				users: action.payload
			};
		default:
			return state;
	}
};
