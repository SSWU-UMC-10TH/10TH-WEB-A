import axios, { type InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../src/constants/key";
import { useLocalStorage } from "../src/hooks/useLocalStorage";

interface CustominternalAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

let refreshPromise: Promise<string> | null = null;

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL,
});

// 1. 토큰 갱신 전용 "순수" Axios 인스턴스 (인터셉터 없음)
const refreshInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
        const accessToken = getItem();
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest: CustominternalAxiosRequestConfig = error.config;

        // 401 에러이고 재시도 전인 경우
        if (error.response?.status === 401 && !originalRequest._retry) {
            
            // 2. URL 체크: 이미 refresh 요청 중에 401이 났다면 즉시 중단
            if (originalRequest.url?.includes('/auth/refresh')) {
                handleLogout();
                return Promise.reject(error);
            }

            originalRequest._retry = true;

            if (!refreshPromise) {
                refreshPromise = (async () => {
                    try {
                        const { getItem: getRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
                        const refreshToken = getRefreshToken();

                        // 3. 수정: axiosInstance 대신 refreshInstance 사용 (루프 방지 핵심)
                        const { data } = await refreshInstance.post('/v1/auth/refresh', {
                            refresh: refreshToken,
                        });

                        const newAccessToken = data.data.accessToken;
                        const newRefreshToken = data.data.refreshToken;

                        const { setItem: setAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
                        const { setItem: setRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
                        
                        setAccessToken(newAccessToken);
                        setRefreshToken(newRefreshToken);

                        return newAccessToken;
                    } catch (refreshError) {
                        handleLogout();
                        return Promise.reject(refreshError);
                    } finally {
                        refreshPromise = null;
                    }
                })();
            }

            return refreshPromise.then((newAccessToken: string) => {
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest); // 재시도
            });
        }

        return Promise.reject(error);
    }
);

// 로그아웃 공통 로직
function handleLogout() {
    const { removeItem: removeAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const { removeItem: removeRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
    removeAccessToken();
    removeRefreshToken();
    if (window.location.pathname !== '/login') {
        window.location.href = "/login";
    }
}