import {authService} from "@/services/authService";
import {Register} from "@/types/Auth";

export const useAuth = () => {

    const register = async (registerData: Register) => {
        try {
            console.log("registerData - 1: ",registerData);
            const data = await authService.register(registerData);
            console.log("Data - 3: ",data);
        } catch (error){
            console.error("Erro ao registrar um novo usuário: ", error);
        }
    }


    return {
        register,
    }
}