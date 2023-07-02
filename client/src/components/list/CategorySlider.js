import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FreeMode, Mousewheel } from "swiper";
//Api
import { get } from "../../api/Api";
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
        slidesPerView={"auto"}
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
              <CategorySlide
                name={category.name}
                japanName={category.japan_name}
                image={category.image}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default CategorySlider;
