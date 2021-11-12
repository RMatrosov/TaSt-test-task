import axios from "axios";
import {TNewUser} from "../types/TNewUser";

const URL = `http://localhost:3002`


export const patchUsersFromApi = async (id: string, newUser: TNewUser) => {
    try {
        const {data} = await axios.patch(`${URL}/cards/${id}`, {
                name: newUser.name,
                email: newUser.email,
                about: newUser.about,
                link: newUser.link,
            },
        )
        return data
    } catch (e) {
        console.log(e)
    }
}

export const addUserToApi = async (newUser: TNewUser) => {
    try {
        const {data} = await axios.post(`${URL}/cards`, {
                name: newUser.name,
                email: newUser.email,
                about: newUser.about,
                link: newUser.link,
            },
        )
        return data
    } catch (e) {
        console.log(e)
    }
}

export const deleteUserFromApi = async (id: string) => {
    try {
        const {data} = await axios.delete(`${URL}/cards/${id}`)
        return data
    } catch (e) {
        console.log(e)
    }
}

export const fetchUsersFromApi = async () => {
    try {
        const {data} = await axios.get(`${URL}/cards`)
        return data
    } catch (e) {
        console.log(e)
    }
}

