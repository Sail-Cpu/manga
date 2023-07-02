import React, { useEffect, useRef, useState } from "react";

const CategorySlide = (props) => {
  const h1Ref = useRef();
  const [h1Width, setH1Width] = useState(1);

  useEffect(() => {
    if (h1Ref.current) {
      setH1Width(h1Ref.current.offsetWidth - h1Ref.current.offsetHeight + 10);
    }
  }, []);

  return (
    <div
      className="category-slide"
      style={{ backgroundImage: `url(${props.image})` }}
    >
      <div className="category-slide-back"></div>
      <div className="category-slide-left">
        <h1>{props.japanName}</h1>
      </div>
      <div
        className="category-slide-right"
        style={{ justifyContent: props.active ? `flex-end` : `flex-start` }}
      >
        <h1
          ref={h1Ref}
          style={{
            marginBottom: `${h1Width}px`,
          }}
        >
          {props.name}
        </h1>
      </div>
    </div>
  );
};

export default CategorySlide;
