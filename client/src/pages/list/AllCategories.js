import React, { useEffect, useState } from "react";
//Api
import { get } from "../../api/ApiManga";
import { Link } from "react-router-dom";

const AllCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    get
      .fetchCategories()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(categories);

  return (
    <div className="all-categories-page">
      {categories.map((category, idx) => {
        return (
          <Link key={idx} to={`/category/${category.id}/0`}>
            <div
              className="category-block-container"
              style={{ backgroundImage: `url(${category.image})` }}
            >
              <div className="category-block-back"></div>
              <div className="category-block-top">{category.japan_name}</div>
              <div className="category-block-bottom">{category.name}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default AllCategories;
