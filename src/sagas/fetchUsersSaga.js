import { takeLatest, put, take } from 'redux-saga/effects'

export const types = {
	FETCH_USERS_REQUEST: "FETCH_USERS_REQUEST",
	FETCH_USERS_CONFIRM: "FETCH_USERS_CONFIRM",
	FETCH_USERS_SUCCESS: "FETCH_USERS_SUCCESS"
};

const { FETCH_USERS_REQUEST, FETCH_USERS_CONFIRM, FETCH_USERS_SUCCESS } = types;

function *fetchUsers(action) {
  yield take(FETCH_USERS_CONFIRM);
  const results = yield fetch(`https://api.github.com/users`)
  .then(r => r.json())
  yield put(actions.fetchUsersSuccess(results))
}


export function *fetchUsersWatcher() {
  yield takeLatest(FETCH_USERS_REQUEST, fetchUsers );
}


export const actions = {
  fetchUsersRequest: () => ({ type: FETCH_USERS_REQUEST }),
  fetchUsersSuccess: payload => ({ type: FETCH_USERS_SUCCESS, payload })
};