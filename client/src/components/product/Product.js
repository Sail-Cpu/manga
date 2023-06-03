import React from "react";
//Icon
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link } from "react-router-dom";

const Product = (props) => {
  return (
    <div className="product-card-container">
      <div
        className="product-card-image"
        style={{ backgroundImage: `url(${props.image})` }}
      ></div>
      <div className="product-card-content">
        <div className="product-card-type">{props.type}</div>
        <div
          className="product-card-name"
          style={{ fontSize: "20px", color: "#fff" }}
        >
          {props.name}
        </div>
        <div
          className="product-card-heart"
          style={{ justifyContent: "space-between", alignItems: "flex-end" }}
        >
          <Link to={props.path}>
            <button>SEE MORE</button>
          </Link>
          <FavoriteBorderIcon />
        </div>
      </div>
    </div>
  );
};

export default Product;
