import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
//Context
import { UserContext } from "../../context/UserContext";
//Icon
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Product = (props) => {
  const { getToken } = useContext(UserContext);
  const navigate = useNavigate();

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (props.likes.indexOf(props.id) !== -1) {
      setIsLiked(true);
    }
  }, [props.id, props.likes]);

  const likeConfig = {
    method: "post",
    url: "http://localhost:3002/like",
    data: {
      user_id: getToken()?.id,
      collection_id: props.id,
    },
  };

  const dislikeConfig = {
    method: "delete",
    url: "http://localhost:3002/like",
    data: {
      user_id: getToken()?.id,
      collection_id: props.id,
    },
  };

  const like = async (e) => {
    if (!getToken()) {
      navigate("/sign/signin");
      return;
    }
    if (!isLiked) {
      axios(likeConfig)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios(dislikeConfig)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setIsLiked(!isLiked);
  };

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
          {!getToken() || !isLiked ? (
            <FavoriteBorderIcon onClick={(e) => like(e)} />
          ) : (
            <FavoriteIcon onClick={(e) => like(e)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
