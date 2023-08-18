import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
//Api
import { get } from "../../api/ApiManga";
import { User } from "../../api/ApiUser";
//Context
import { UserContext } from "../../context/UserContext";
//Components
import ProductList from "../../components/list/ProductList";
//Images
import CollectionImage from "../../assets/img/collection.jpeg";
import MangaImage from "../../assets/img/mangas.jpg";

const UserLikes = () => {
  const [collections, setCollections] = useState([]);
  const [mangas, setMangas] = useState([]);

  const { getToken } = useContext(UserContext);

  useEffect(() => {
    if (getToken) {
      User.fetchUserById(getToken()?.id)
        .then((response) => {
          for (let i = 0; i < response.collectionsLikes.length; i++) {
            get
              .fetchCollection(response.collectionsLikes[i])
              .then((response) => {
                setCollections((collections) => [
                  ...collections,
                  response.data[0],
                ]);
              })
              .catch((error) => {
                console.log(error);
              });
          }
          for (let i = 0; i < response.mangasLikes.length; i++) {
            get
              .fetchMangasById(response.mangasLikes[i])
              .then((response) => {
                setMangas((mangas) => [...mangas, response.data[0]]);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [getToken]);

  return (
    <div className="user-likes">
      <Swiper slidesPerView={1} navigation={true} modules={[Navigation]}>
        <SwiperSlide>
          <div
            className="user-likes-title-container"
            style={{ backgroundImage: `url(${CollectionImage})` }}
          >
            <h1>Collection</h1>
            <div className="user-likes-title-back"></div>
          </div>
          <ProductList datas={collections} path="/collections/" />
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="user-likes-title-container"
            style={{ backgroundImage: `url(${MangaImage})` }}
          >
            <h1>Mangas</h1>
            <div className="user-likes-title-back"></div>
          </div>
          <ProductList datas={mangas} path="/mangas/" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default UserLikes;
