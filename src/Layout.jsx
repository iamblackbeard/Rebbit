import React from "react";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex flex-col h-screen ">
      <Header additionalClass="grow-0" /> 
       <div className="flex-grow pt-16 ">
      {/* <div className="flex-grow "> */}
        <Outlet context={{ additionalClass: "grow" }} />
      </div>
    </div>
  );
}

export default Layout;
