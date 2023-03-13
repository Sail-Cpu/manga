import React from "react";
//image
import MangeType from '../assets/img/manga-type.png';
import MangaBar from "../components/other/MangaBar";

const Home = () => {
    return(
        <div className="home">
            <div className="hero-banner">
                <MangaBar classname="hero-banner-bar-manga"/>
                <div className="hero-banner-title-container">
                    <span>マ</span>
                    <span>ン</span>
                    <span>ガ</span>
                </div>
            </div>
            <div className="type-container">
                <div className="type-header">
                    <div className="type-header-left">
                        <div className="type-header-left-box">
                            <img className="type-header-img" alt="manga-type" src={MangeType} />
                        </div>
                        <h1>タイプ</h1>
                    </div>
                    <div className="type-header-right">
                        <div className="type-header-right-box"></div>
                    </div>
                </div>
                <div className="type-content">

                </div>
            </div>
        </div>
    )
}

export default Home;