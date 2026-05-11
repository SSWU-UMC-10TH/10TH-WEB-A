import { createContext, useState, useContext, type PropsWithChildren } from "react";
import { type RequestSigninDto } from '../types/auth';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from '../constants/key';
import { postLogout, postSignin } from '../../apis/auth';
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
    // 매개변수 정의 수정: { signinData: RequestSigninDto } 형태라면 아래와 같이 작성
    login: (signinData: RequestSigninDto) => Promise<void>;
    logout: () => Promise<void>;
}

// 초기값 설정
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const {
        getItem: getAccessTokenFromStorage,
        setItem: setAccessTokenStorage,
        removeItem: removeAccessTokenFromStorage,
    } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    
    const {
        getItem: getRefreshTokenFromStorage,
        setItem: setRefreshTokenStorage,
        removeItem: removeRefreshTokenFromStorage,
    } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

    // 초기값 함수 호출 시 세미콜론(;) 제거
    const [accessToken, setAccessToken] = useState<string | null>(() => getAccessTokenFromStorage());
    const [refreshToken, setRefreshToken] = useState<string | null>(() => getRefreshTokenFromStorage());

    const login = async (signinData: RequestSigninDto) => {
        try {
            const { data } = await postSignin(signinData);

            if (data) {
                const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data;

                setAccessTokenStorage(newAccessToken);
                setRefreshTokenStorage(newRefreshToken); // 오타 수정 (Stroage -> Storage)

                setAccessToken(newAccessToken);
                setRefreshToken(newRefreshToken);
                alert("로그인 성공");
            }
        } catch (error) {
            console.error("로그인 오류", error);
            alert("로그인 실패");
        }
    };

    const logout = async () => {
        try {
            await postLogout();
        } catch (error) {
            console.error("로그아웃 API 오류", error);
        } finally {
            removeAccessTokenFromStorage();
            removeRefreshTokenFromStorage();

            setAccessToken(null);
            setRefreshToken(null);
            alert("로그아웃 성공");
            window.location.href="/mypage"
        }
    };

    return (
        <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
            {children} 
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth는 AuthProvider 내부에서 사용되어야 합니다.");
    }
    return context;
};