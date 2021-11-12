import {
    ADD_USER,
    DELETE_USER, DELETE_USER_FROM_SERVER,
    EDIT_USER, FETCH_USERS, PATH_USER, POST_USER,
    SET_EDITED_USERS,
    SET_IS_OPEN,
    SET_LOADED,
    SET_USERS
} from "../constants/constants";
import {TUser} from "../../types/TUser";
import {TNewUser} from "../../types/TNewUser";
import {
    IAddUser,
    IDeleteUser,
    IDeleteUserServer,
    IEditUser,
    IPath, IPathUser, IPostUser,
    ISetEditedUsers,
    ISetIsOpen,
    ISetLoaded, ISetUsers
} from "./actionTypes";

export const setUsers = (payload: TUser[]): ISetUsers => ({type: SET_USERS, payload})
export const setLoaded = (payload: boolean): ISetLoaded => ({type: SET_LOADED, payload})
export const fetchUsers = () => ({type: FETCH_USERS})
export const setEditedUsers = (payload: TUser): ISetEditedUsers => ({type: SET_EDITED_USERS, payload})
export const setIsOpen = (payload: boolean): ISetIsOpen => ({type: SET_IS_OPEN, payload})
export const pathUser = (user: IPath): IPathUser =>
    ({type: PATH_USER, payload: user})
export const editUser = (payload: TUser): IEditUser => ({type: EDIT_USER, payload})

export const postUser = (payload: TNewUser): IPostUser => ({type: POST_USER, payload})
export const addUser = (payload: TUser): IAddUser => ({type: ADD_USER, payload})

export const deleteUserServer = (payload: string): IDeleteUserServer => ({type: DELETE_USER_FROM_SERVER, payload})
export const deleteUser = (payload: TUser): IDeleteUser => ({type: DELETE_USER, payload})


