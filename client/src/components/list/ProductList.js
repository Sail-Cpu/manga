import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
//Api
import { User } from "../../api/ApiUser";
//Context
import { UserContext } from "../../context/UserContext";
//Components
import Product from "../product/Product";

const ProductList = (props) => {
  const [likes, setLikes] = useState([]);

  const { getToken } = useContext(UserContext);

  useEffect(() => {
    if (getToken()) {
      User.fetchUserById(getToken()?.id)
        .then((response) => {
          if (props.path === "/collections/") {
            setLikes(response.collectionsLikes);
          } else if (props.path === "/mangas/") {
            setLikes(response.mangasLikes);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <div className="product-list-container">
      <div className="product-list">
        {props.datas.map((data, idx) => {
          return (
            <Product
              key={idx}
              id={data.id}
              type={data.type}
              name={data.name}
              image={data?.background_images?.[0] || data?.poster}
              path={props.path + data.id}
              dataType={props.path.replace(/\//g, "")}
              likes={likes}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
