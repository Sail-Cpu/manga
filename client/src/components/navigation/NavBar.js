import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
//Context
import { UserContext } from "../../context/UserContext";
//Components
import Search from "./Search";
import Tabs from "./Tabs";
import MangaBar from "../other/MangaBar";
//Img
import Menu_Icon from "../../assets/img/menu_icon.png";

const NavBar = (props) => {
  const tabs = [
    { first: "HOME", other: [], path: "/" },
    { first: "MANGAS", other: ["TYPE", "CATEGORY", "COLLECTIONS"] },
    { first: "NOUVEAUTES", other: [] },
    { first: "ALL MANGAS", other: [] },
  ];

  const { getToken } = useContext(UserContext);

  return (
    <>
      <img
        className="nav-bar-menu-icon"
        alt="menu_icon"
        style={{ transform: props.activeNav ? "rotate(-90deg)" : "" }}
        src={Menu_Icon}
        onClick={() => props.setActiveNav(!props.activeNav)}
      />
      <div className={`nav-bar ${props.activeNav ? "active" : ""}`}>
        <MangaBar classname="menu-bar-manga" />
        <Search />
        <div className="tabs-container">
          <div className="tabs-list">
            {tabs.map((tab, index) => {
              return (
                <Link key={index} to={tab.path}>
                  <Tabs name={tab.first} submenu={tab.other} />
                </Link>
              );
            })}
            <div className="user-tab-container">
              {getToken() && (
                <Link to="/user">
                  <div className="user-tab">
                    {getToken()?.pseudo[0].toUpperCase()}
                  </div>
                </Link>
              )}
            </div>
          </div>
          <Link to="/sign/signin">
            <div className="tabs-login">CONNEXION</div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;
