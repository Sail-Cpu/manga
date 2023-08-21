import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
//Anim
import NotFoundAnim from "../../assets/anim/404Anim.json";

const NotFound = () => {
  const animationContainer = useRef(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationContainer.current,
      animationData: NotFoundAnim,
      renderer: "svg",
      loop: true,
      autoplay: true,
    });

    return () => {
      anim.destroy();
    };
  }, []);

  return (
    <div className="not-found-page">
      <div className="not-found-anim" ref={animationContainer}></div>
    </div>
  );
};

export default NotFound;
