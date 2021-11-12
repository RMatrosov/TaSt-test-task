import {put, takeEvery, call} from "redux-saga/effects"

import {addUserToApi, deleteUserFromApi, fetchUsersFromApi, patchUsersFromApi} from "../../api/api";
import {addUser, deleteUser, editUser, setLoaded, setUsers} from "../actions/actions";
import {DELETE_USER_FROM_SERVER, FETCH_USERS, PATH_USER, POST_USER} from "../constants/constants";
import {IDeleteUserServer, IPathUser, IPostUser} from "../actions/actionTypes";


function* fetchUserWorker(): any {
    const data = yield call(fetchUsersFromApi)
    yield put(setUsers(data.data))
    yield put(setLoaded(true))
}

function* pathUserWorker({payload}: IPathUser) {
    const {id, newUser} = payload
    const {data} = yield call(patchUsersFromApi, id, newUser)
    yield put(editUser(data))
}

function* addUserWorker({payload}: IPostUser) {
    const {data} = yield call(addUserToApi, payload)
    yield put(addUser(data))
}

function* deleteUserWorker({payload}: IDeleteUserServer) {
    const {data} = yield call(deleteUserFromApi, payload)
    yield put(deleteUser(data))
}


export function* userWatcher() {
    yield takeEvery(FETCH_USERS, fetchUserWorker);
    yield takeEvery(PATH_USER, pathUserWorker);
    yield takeEvery(POST_USER, addUserWorker);
    yield takeEvery(DELETE_USER_FROM_SERVER, deleteUserWorker);
}


