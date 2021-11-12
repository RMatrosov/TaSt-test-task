import {TNewUser} from "../../types/TNewUser";
import {
    ADD_USER,
    DELETE_USER,
    DELETE_USER_FROM_SERVER, EDIT_USER,
    PATH_USER, POST_USER,
    SET_EDITED_USERS, SET_IS_OPEN,
    SET_LOADED,
    SET_USERS
} from "../constants/constants";
import {TUser} from "../../types/TUser";


export interface IPath {
    id: string
    newUser: TNewUser
}

export interface IPathUser {
    type: typeof PATH_USER,
    payload: IPath
}


export interface IAddUser {
    type: typeof ADD_USER,
    payload: TUser
}

export interface IDeleteUserServer {
    type: typeof DELETE_USER_FROM_SERVER,
    payload: string
}

export interface IDeleteUser {
    type: typeof DELETE_USER,
    payload: TUser
}

export interface ISetUsers {
    type: typeof SET_USERS,
    payload: TUser[]
}

export interface ISetLoaded {
    type: typeof SET_LOADED,
    payload: boolean
}

export interface ISetEditedUsers {
    type: typeof SET_EDITED_USERS,
    payload: TUser
}

export interface ISetIsOpen {
    type: typeof SET_IS_OPEN,
    payload: boolean
}

export interface IEditUser {
    type: typeof EDIT_USER,
    payload: TUser
}

export interface IPostUser {
    type: typeof POST_USER,
    payload: TNewUser
}

export type TAction =
    | IPostUser
    | IEditUser
    | ISetIsOpen
    | ISetEditedUsers
    | ISetLoaded
    | ISetUsers
    | IDeleteUser
    | IDeleteUserServer
    | IAddUser
    | IPathUser

