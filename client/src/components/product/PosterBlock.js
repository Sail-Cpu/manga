import React from "react";
import { Link } from "react-router-dom";

const PosterBlock = (props) => {
  return (
    <div className="poster-block-container">
      <Link to={`/types/${props.id}/0`}>
        <div className="title">{props.name.toUpperCase()}</div>
        <div
          className="poster-block"
          style={{ backgroundImage: `url(${props.background_image})` }}
        ></div>
        <div className="title">{props.japan_name}</div>
      </Link>
    </div>
  );
};

export default PosterBlock;
