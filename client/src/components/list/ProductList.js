import React, { useEffect, useState } from "react";
import Product from "../product/Product";
import axios from "axios";

const ProductList = (props) => {
  const [likes, setLikes] = useState([]);

  const fetchUserById = async () => {
    const endpoint = `http://localhost:3002/users/16`;
    return await (
      await axios.get(endpoint)
    ).data;
  };

  useEffect(() => {
    fetchUserById()
      .then((response) => {
        setLikes(response.likes);
      })
      .catch((error) => {
        console.log(error);
      });
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
              likes={likes}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
