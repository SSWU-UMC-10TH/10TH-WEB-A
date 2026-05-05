import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

const HomeLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0b12] text-white">
      <Navbar onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>

      {accessToken && (
        <button
          onClick={() => navigate("/lp/create")}
          className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-[#f472b6] text-white text-2xl font-bold shadow-lg hover:bg-[#ec4899] transition flex items-center justify-center z-10"
          aria-label="새 LP 작성"
        >
          +
        </button>
      )}
    </div>
  );
};

export default HomeLayout;