import React from "react";
import Product from "../product/Product";

const ProductList = (props) => {
  return (
    <div className="product-list-container">
      <div className="product-list">
        {props.datas.map((data, idx) => {
          return (
            <Product
              key={idx}
              type={data.type}
              name={data.name}
              image={data?.background_images?.[0] || data?.poster}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
