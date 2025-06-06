import React from "react";
import Header from "../dashboard/Header";
import Footer from "../dashboard/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mt-10 ">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
