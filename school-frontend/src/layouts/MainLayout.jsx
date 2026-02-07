import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import MovingAnnouncementBar from "../components/common/MovingAnnouncementBar";
import Footer from "../components/common/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <MovingAnnouncementBar />
      <Footer />
    </div>
  );
};

export default MainLayout;
