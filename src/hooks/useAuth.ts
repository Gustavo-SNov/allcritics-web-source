import {authService} from "@/services/authService";
import {Register} from "@/types/Auth";
import {useState} from "react";
import {User} from "@/types/User";

export const useAuth = () => {
    const [user, setUser] = useState<User>();


    const register = async (registerData: Register) => {
        try {
            console.log("registerData - 1: ", registerData);
            const data = await authService.register(registerData);
            console.log("Data - 3: ", data);
            setUser(data);
        } catch (error) {
            console.error("Erro ao registrar um novo usuário: ", error);
        }
    }

    return {
        user: user,
        register,
    }
}