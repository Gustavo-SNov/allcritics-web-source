import api from "@/lib/api";
import {User, USER_URL, USERNAME_URL} from "@/types/User";

const getUserUrlByParam = (URL: string,param: string) => `${URL}/${param}`;


export const userService = {
    getUserById: async (idUser: string): Promise<User> => {
        const response = await api.get<User>(getUserUrlByParam(USER_URL,idUser));
        return response.data;
    },
    getUserByUsername: async (username: string): Promise<User> => {
        const response = await api.get<User>(getUserUrlByParam(USERNAME_URL,username));
        return response.data;
    },
    updateUser: async (idUser: string, payload: Partial<User>): Promise<User> => {
        const response = await api.put<User>(getUserUrlByParam(USER_URL, idUser), payload);
        return response.data;
    }
}

