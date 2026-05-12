import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <>
      {/* 모바일 오버레이 */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={onClose} />
      )}

      {/* 사이드바 */}
      <aside
        ref={sidebarRef}
        className={`
          fixed md:static top-0 left-0 h-full z-30
          w-48 bg-[#111118] border-r border-white/10
          flex flex-col justify-between py-6 px-4
          transition-transform duration-300
          md:translate-x-0 md:flex
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <nav className="flex flex-col gap-2 mt-14 md:mt-0">
          <button
            onClick={() => { navigate("/"); onClose(); }}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            찾기
          </button>

          {accessToken && (
            <button
              onClick={() => { navigate("/my"); onClose(); }}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
              마이페이지
            </button>
          )}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;