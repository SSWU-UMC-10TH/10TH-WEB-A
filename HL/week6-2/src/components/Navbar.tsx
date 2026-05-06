import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface NavbarProps {
  onToggleSidebar?: () => void;
}

const Navbar = ({ onToggleSidebar }: NavbarProps) => {
  const navigate = useNavigate();
  const { accessToken, name, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between border-b border-white/10 bg-black/30 px-4 py-3 backdrop-blur-sm sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="text-white p-1 rounded hover:bg-white/10 transition"
          aria-label="메뉴 열기"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <span
          className="text-[#f472b6] font-bold text-lg cursor-pointer"
          onClick={() => navigate("/")}
        >
          돌려돌려LP판
        </span>
      </div>

      <div className="flex items-center gap-3 text-sm">
        {accessToken ? (
          <>
            <span className="text-gray-300">{name}님 반갑습니다.</span>
            <button
              onClick={logout}
              className="text-gray-400 hover:text-white transition"
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="text-gray-300 hover:text-white transition"
            >
              로그인
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="rounded-lg bg-[#f472b6] px-3 py-1.5 font-semibold text-white shadow-lg transition hover:bg-[#ec4899] active:scale-[0.98]"
            >
              회원가입
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;