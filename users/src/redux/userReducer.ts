import {addUserHandler, deleteUserHandler, editUserHandler} from "./handlers/handlers";
import {
    ADD_USER,
    DELETE_USER,
    EDIT_USER,
    SET_EDITED_USERS,
    SET_IS_OPEN,
    SET_LOADED,
    SET_USERS
} from "./constants/constants";
import {TUser} from "../types/TUser";
import {TAction} from "./actions/actionTypes";

export interface IInitialState {
    users: TUser[]
    isLoaded: boolean
    editedUser: TUser
    isOpen: boolean
}

const initialState: IInitialState = {
    users: [],
    isLoaded: false,
    editedUser: {
        "name": '',
        "email": '',
        "about": '',
        "link": '',
        "createdAt": '',

    },
    isOpen: false,

}

export default function userReducer(state = initialState, action: TAction): IInitialState {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.payload,
            }
        case SET_LOADED:
            return {
                ...state,
                isLoaded: action.payload,
            }
        case DELETE_USER:
            return deleteUserHandler(state, action.payload)

        case EDIT_USER:
            return editUserHandler(state, action.payload)

        case ADD_USER:
            return addUserHandler(state, action.payload)

        case SET_EDITED_USERS:
            return {
                ...state,
                editedUser: action.payload
            }
        case SET_IS_OPEN:
            return {
                ...state,
                isOpen: action.payload
            }
    }
    return state
}


