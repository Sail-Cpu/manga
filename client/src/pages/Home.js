import React from "react";
//image
import MangeType from '../assets/img/manga-type.png';

const Home = () => {
    return(
        <div className="home">
            <div className="hero-banner">
                <div className="hero-banner-bar-manga bar-manga">
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
                <div className="hero-banner-title-container">
                    <span>ガ</span>
                    <span>ン</span>
                    <span>マ</span>
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