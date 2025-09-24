import {useCallback, useState} from "react";
import {User} from "@/types/User";
import {userService} from "@/services/userService";

export const useProfile = () => {
    const [userProfileData, setUserProfileData] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchUserById = useCallback(async (idUser: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await userService.getUserById(idUser);
            setUserProfileData(data);
        } catch (error) {
            console.error("Erro ao carregar os dados do perfil do usuário: ", error);
            setError("Não foi possível carregar os dados do perfil do usuário. Tente novamente mais tarde.");
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchUserByUsername = useCallback(async (username: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await userService.getUserByUsername(username);
            setUserProfileData(data);
        } catch (error) {
            console.error("Erro ao carregar os dados do perfil do usuário: ", error);
            setError("Não foi possível carregar os dados do perfil do usuário. Tente novamente mais tarde.");
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        userProfile: userProfileData || null,
        loading,
        error,
        fetchUserById,
        fetchUserByUsername
    }
}

