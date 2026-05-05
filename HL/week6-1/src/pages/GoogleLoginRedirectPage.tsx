import { useEffect } from "react";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";

const GoogleLoginRedirectPage = () => {
  const { setItem: setAccessToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.accessToken,
  );
  const { setItem: setRefreshToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.refreshToken,
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");

    if (accessToken && refreshToken) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      window.location.href = "/";
    } else {
      // 토큰이 없는 경우 로그인 페이지로 리디렉션
      window.location.href = "/login";
    }
  }, [setAccessToken, setRefreshToken]);

  return <div>Google Login Redirect</div>;
};

export default GoogleLoginRedirectPage;