import {IInitialState} from "../userReducer";
import {TUser} from "../../types/TUser";


export const editUserHandler = (state: IInitialState, payload: TUser) => {
    const filteredUsers = state.users.map((user) => user._id === payload._id ? payload : user)
    return {
        ...state,
        users: filteredUsers,
    }
}

export const addUserHandler = (state: IInitialState, payload: TUser) => {
    const newData = [...state.users, payload]
    return {
        ...state,
        users: newData,
    }
}

export const deleteUserHandler = (state: IInitialState, payload: TUser) => {
    const newData = state.users.filter(user => user._id !== payload._id);
    return {
        ...state,
        users: newData,
    }
}
