import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import type { RequestSigninDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { postSignin, postLogout } from "../apis/auth";
import { LOCAL_STORAGE_KEY } from "../constants/key";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  name: string | null;
  login: (signinData: RequestSigninDto) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  name: null,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const {
    getItem: getAccessTokenFromStorage,
    setItem: setAccessTokenInStorage,
    removeItem: removeAccessTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const {
    getItem: getRefreshTokenFromStorage,
    setItem: setRefreshTokenInStorage,
    removeItem: removeRefreshTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  const {
    getItem: getNameFromStorage,
    setItem: setNameInStorage,
    removeItem: removeNameFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.name);

  const [accessToken, setAccessToken] = useState<string | null>(
    getAccessTokenFromStorage(),
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    getRefreshTokenFromStorage(),
  );
  const [name, setName] = useState<string | null>(getNameFromStorage());

  const login = async (signinData: RequestSigninDto) => {
    try {
      const { data } = await postSignin(signinData);

      if (data) {
        setAccessTokenInStorage(data.accessToken);
        setRefreshTokenInStorage(data.refreshToken);
        setNameInStorage(data.name);
        setAccessToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        setName(data.name);

        const redirectPath = sessionStorage.getItem("redirectPath") || "/";
        sessionStorage.removeItem("redirectPath");
        window.location.href = redirectPath;
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const logout = async () => {
    try {
      await postLogout();
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();
      removeNameFromStorage();
      setAccessToken(null);
      setRefreshToken(null);
      setName(null);
      alert("로그아웃 되었습니다.");
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
      alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
    }
  };
  return (
    <AuthContext.Provider
      value={{ accessToken, refreshToken, name, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};