import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div className="container m-auto px-5">
      <Header />
      <div className="py-10 min-h-lvh">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
