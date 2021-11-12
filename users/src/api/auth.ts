import axios from "axios";

export interface ResponseApi {
    data: any | undefined;
    token: string | undefined
}

const URL = `http://localhost:3002`

export const authorize = async (email: string, password: string) => {
    try {
        const {data} = await axios.post<ResponseApi>(`${URL}/signin`, {
                email: email,
                password: password,
            },
            {
                headers: {'Access-Control-Allow-Origin': '*'}
            }
        )
        if (data.token) {
            localStorage.setItem('jwt', data.token);
            return data;
        }
    } catch (e) {
        console.log(e)
    }
};


