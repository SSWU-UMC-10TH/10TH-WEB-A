import { useEffect, type PropsWithChildren } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!accessToken) {
      alert("로그인이 필요한 서비스입니다. 로그인을 해주세요!");
      sessionStorage.setItem("redirectPath", location.pathname);
      navigate("/login");
    }
  }, [accessToken, location.pathname, navigate]);

  if (!accessToken) return null;

  return <>{children}</>;
};

export default ProtectedRoute;