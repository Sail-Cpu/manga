import React, { useState } from "react";
//Components
import Search from './Search';
import Tabs from './Tabs';
import MangaBar from '../other/MangaBar';
//Img
import Menu_Icon from '../../assets/img/menu_icon.png'

const NavBar = () => {

    const tabs = [
        {first: "HOME", other:[]},
        {first: "MANGAS", other:["TYPE", "CATEGORY", "NOUVEAUTES"]},
        {first: "MOVIES", other:["TYPE", "CATEGORY", "NOUVEAUTES"]},
        {first: "ANIMES", other:["TYPE", "CATEGORY", "NOUVEAUTES"]},
        {first: "ALL PRODUCTS", other:[]},
    ]

    const [activeNav, setActiveNav] = useState(false);

    return(
        <>  
            <img className="nav-bar-menu-icon" alt="menu_icon" style={{transform: activeNav ? 'rotate(-90deg)' : ''}} 
            src={Menu_Icon} onClick={() => setActiveNav(!activeNav)}/>
            <div className={`nav-bar ${activeNav ? 'active' : ''}`}>
                <MangaBar classname="menu-bar-manga"/>
                <Search />
            <div className="tabs-container">
                    <div className="tabs-list">
                        {tabs.map((tab, index) => {
                            return(
                                <Tabs key={index} name={tab.first} submenu={tab.other}/>
                            )
                        })}
                        <Tabs name="DATA FORM" submenu={[]}/>
                    </div>
                    <div className="tabs-login">CONNEXION</div>
                </div>
            </div>
        </>
        
    )
}

export default NavBar;