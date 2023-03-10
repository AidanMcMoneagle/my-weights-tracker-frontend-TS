import React, { useState, useEffect } from "react";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import BackDrop from "../UIElements/BackDrop";

import "./MainNavigation.css";

const MainNavigation = () => {
  const [sideDrawerOpen, setIsSideDrawerOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  useEffect(() => {
    width > 999 && setIsSideDrawerOpen(false);
  }, [width]);

  const openSideDrawer = () => {
    setIsSideDrawerOpen(true);
  };

  const closeSideDrawer = () => {
    setIsSideDrawerOpen(false);
  };

  return (
    <React.Fragment>
      {sideDrawerOpen && <BackDrop onClick={closeSideDrawer} />}

      <SideDrawer show={sideDrawerOpen} onClick={closeSideDrawer}>
        <header className="side-drawer__header">
          <h1 className="main-header__title">myWeightsTracker</h1>
        </header>
        <div className="main-header__sidebar-navlinks">
          <NavLinks sideDrawerOpen={sideDrawerOpen} />
        </div>
      </SideDrawer>

      <MainHeader>
        <button
          className="main-header__toggle-sidebar-btn"
          onClick={openSideDrawer}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-header__title">myWeightsTracker</h1>
        <div className="main-header__navlinks">
          <NavLinks sideDrawerOpen={sideDrawerOpen} />
        </div>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
