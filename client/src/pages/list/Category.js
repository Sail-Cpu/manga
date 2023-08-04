import React, { useEffect, useState } from "react";
//Api
import { get } from "../../api/Api";
//Components
import CategorySlide from "../../components/product/CategorySlide";
import { useParams } from "react-router-dom";
import ProductList from "../../components/list/ProductList";

const Category = () => {
  const { categoryID } = useParams();
  const [category, setCategory] = useState();
  const [allCollections, setAllCollections] = useState();

  useEffect(() => {
    get
      .fetchCategoryById(categoryID)
      .then((response) => {
        setCategory(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    get
      .fetchCollectionsByCategory(categoryID)
      .then((response) => {
        setAllCollections(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="category-container">
      {category && allCollections && (
        <>
          <div className="category-title-container">
            <CategorySlide
              name={category.name}
              japanName={category.japan_name}
              image={category.image}
            />
          </div>
          <ProductList datas={allCollections} path="/collections/" />
        </>
      )}
    </div>
  );
};

export default Category;
