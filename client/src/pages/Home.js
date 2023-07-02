import React, { useEffect, useState } from "react";
//Components
import CategorySlider from "../components/list/CategorySlider";
//image
import MangeType from "../assets/img/manga-type.png";
import MangaBar from "../components/other/MangaBar";
import PosterBlock from "../components/product/PosterBlock";
//api
import { get } from "../api/Api";

const Home = () => {
  const [types, setTypes] = useState([]);
  useEffect(() => {
    get
      .fetchType()
      .then((response) => {
        setTypes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="home">
      <div className="hero-banner">
        <MangaBar classname="hero-banner-bar-manga" />
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
              <img
                className="type-header-img"
                alt="manga-type"
                src={MangeType}
              />
            </div>
            <h1>タイプ</h1>
          </div>
          <div className="type-header-right">
            <div className="type-header-right-box"></div>
          </div>
        </div>
        <div className="type-content">
          {types.map((type, idx) => {
            return (
              <PosterBlock
                key={idx}
                id={type.id}
                name={type.name}
                background_image={type.background_image}
                japan_name={type.japan_name}
              />
            );
          })}
        </div>
      </div>
      <CategorySlider />
    </div>
  );
};

export default Home;
