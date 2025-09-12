import {createContext, useState, useEffect, useContext, ReactNode} from 'react';
import {authService} from '@/services/authService';
import {User} from '@/types/User';
import {Register, Login} from '@/types/Auth';
import api from '@/lib/api';

// --- Tipagem para o valor do Contexto ---
interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    register: (registerData: Register) => Promise<void>;
    login: (loginData: Login) => Promise<void>;
    logout: () => void;
}

// --- Criação do Contexto ---
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- Chave para o localStorage ---
const USER_STORAGE_KEY = '@AllCritics:user';

// --- Componente Provedor ---
export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true); // Inicia como true para checar o storage
    const [error, setError] = useState<string | null>(null);

    // Efeito para carregar o usuário do localStorage na inicialização
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem(USER_STORAGE_KEY);
            if (storedUser) {
                const parsedUser: User = JSON.parse(storedUser);
                setUser(parsedUser);
                // IMPORTANTE: Seta o token no header do Axios para requisições futuras
                api.defaults.headers.common['Authorization'] = `Bearer ${parsedUser.token}`;
            }
        } catch (e) {
            console.error("Failed to parse user from localStorage", e);
            localStorage.removeItem(USER_STORAGE_KEY);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleUserSession = (userData: User) => {
        // 1. Atualiza o estado
        setUser(userData);
        // 2. Seta o token nos headers do Axios para as próximas requisições
        api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
        // 3. Persiste no localStorage
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    };

    // --- Funções de Autenticação ---
    const register = async (registerData: Register) => {
        setIsLoading(true);
        setError(null);
        try {
            // A API de registro deve retornar o objeto User com o token
            const userData = await authService.register(registerData);
            handleUserSession(userData);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Erro ao registrar. Tente novamente.');
            }
            throw err; // Re-lança o erro para o componente poder tratar se necessário
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (loginData: Login) => {
        setIsLoading(true);
        setError(null);
        try {
            // Você precisará criar authService.login
            const userData = await authService.login(loginData);
            handleUserSession(userData);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Erro ao registrar. Tente novamente.');
            }
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        // Remove o token dos headers do Axios
        delete api.defaults.headers.common['Authorization'];
        // Limpa o localStorage
        localStorage.removeItem(USER_STORAGE_KEY);
    };

    return (
        <AuthContext.Provider value={{user, isLoading, error, register, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

// --- Hook customizado para usar o contexto ---
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};