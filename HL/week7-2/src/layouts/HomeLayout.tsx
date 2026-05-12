import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const HomeLayout = () => {
    return (
        <div className="h-dvh flex flex-col">
            <Navbar onToggleSidebar={function (): void {
          throw new Error("Function not implemented.");
        } } />
            <main className="flex-1 mt-10">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default HomeLayout;