import { fetchUsersWatcher } from './fetchUsersSaga';
import { all } from 'redux-saga/effects'

export default function *rootSaga() {
  yield all([
    fetchUsersWatcher()
  ])
}