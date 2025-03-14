import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function Layout() {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <div className="min-h-[80vh] mx-auto w-11/12">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;