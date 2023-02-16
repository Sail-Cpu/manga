import React, { useState } from "react";
//Components
import Search from './Search';
import Tabs from './Tabs';
//Img
import Menu_Icon from '../../assets/img/menu_icon.png'

const NavBar = () => {

    const tabs = [
        {first: "HOME", other:[]},
        {first: "MANGAS", other:["TYPE", "CATEGORY", "NOUVEAUTES"]},
        {first: "FILMS", other:["TYPE", "CATEGORY", "NOUVEAUTES"]},
        {first: "ANIMES", other:["TYPE", "CATEGORY", "NOUVEAUTES"]},
        {first: "TOUT LES PRODUITS", other:[]},
    ]

    const [activeNav, setActiveNav] = useState(false);

    return(
        <>  
            <img className="nav-bar-menu-icon" alt="menu_icon" style={{transform: activeNav ? 'rotate(-90deg)' : ''}} 
            src={Menu_Icon} onClick={() => setActiveNav(!activeNav)}/>
            <div className={`nav-bar ${activeNav ? 'active' : ''}`}>
                <div className="bar-manga">
                    <div>
                        <span>MANGA ガンマ&nbsp;</span>
                        <span>MANGA ガンマ&nbsp;</span>
                        <span>MANGA ガンマ&nbsp;</span>
                        <span>MANGA ガンマ&nbsp;</span>
                        <span>MANGA ガンマ&nbsp;</span>
                        <span>MANGA ガンマ&nbsp;</span>
                        <span>MANGA ガンマ&nbsp;</span>
                        <span>MANGA ガンマ&nbsp;</span>
                        <span>MANGA ガンマ&nbsp;</span>
                        <span>MANGA ガンマ&nbsp;</span>
                        <span>MANGA ガンマ&nbsp;</span>
                        <span>MANGA ガンマ&nbsp;</span>
                        <span>MANGA ガンマ&nbsp;</span>
                        <span>MANGA ガンマ&nbsp;</span>
                        <span>MANGA ガンマ&nbsp;</span>
                        <span>MANGA ガンマ&nbsp;</span>
                        <span>MANGA ガンマ&nbsp;</span>
                        <span>MANGA ガンマ&nbsp;</span>
                        <span>MANGA ガンマ&nbsp;</span>
                        <span>MANGA ガンマ&nbsp;</span>
                    </div>
                </div>
                <Search />
            <div className="tabs-container">
                    <div className="tabs-list">
                        {tabs.map((tab) => {
                            return(
                                <Tabs name={tab.first} submenu={tab.other}/>
                            )
                        })}
                    </div>
                    <div className="tabs-login">CONNEXION</div>
                </div>
            </div>
        </>
        
    )
}

export default NavBar;