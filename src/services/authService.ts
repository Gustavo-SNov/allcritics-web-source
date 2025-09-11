import api from "@/lib/api";
import {User} from "@/types/User";
import {Login, Register} from "@/types/Auth";

const AUTH_URL = "/auth"

export const authService = {

    register: async (registerData: Register): Promise<User> => {
        const REGISTER_URL = AUTH_URL + "/register"
        const response = await api.post(REGISTER_URL, registerData);
        console.log("Response: ",response);
        return response.data;
    },
    login: async (loginData: Login): Promise<User> => {
        const LOGIN_URL = AUTH_URL + "/login";
        // Sua API deve retornar o objeto User completo com o token após o login
        const response = await api.post<User>(LOGIN_URL, loginData);
        return response.data;
    }
}