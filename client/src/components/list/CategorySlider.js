import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";
import "swiper/css";
//Api
import { get } from "../../api/ApiManga";
//Components
import CategorySlide from "../product/CategorySlide";

const CategorySlider = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    get
      .fetchCategories()
      .then((response) => {
        setAllCategories(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        freeMode={true}
        modules={[FreeMode, Mousewheel]}
        mousewheel={true}
      >
        {allCategories.map((category, idx) => {
          return (
            <SwiperSlide
              key={idx}
              onMouseOver={() => setActive(idx)}
              onMouseLeave={() => setActive(-1)}
            >
              <Link to={`/category/${category.id}`}>
                <CategorySlide
                  name={category.name}
                  japanName={category.japan_name}
                  image={category.image}
                />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};
export default CategorySlider;
