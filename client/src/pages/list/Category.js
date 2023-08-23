import React, { useEffect, useState } from "react";
//Api
import { get } from "../../api/ApiManga";
//Components
import CategorySlide from "../../components/product/CategorySlide";
import { useParams } from "react-router-dom";
import ProductList from "../../components/list/ProductList";
import Next from "../../components/navigation/Next";

const Category = () => {
  const { categoryID, categoryPage } = useParams();
  const [category, setCategory] = useState();
  const [allCollections, setAllCollections] = useState();
  const [page, setPage] = useState(0);
  const pageSize = 40;

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
      .fetchCollections("", categoryID, page, "", pageSize, "")
      .then((response) => {
        setAllCollections(response.data);
        setPage(Math.ceil(response.nbCollections / pageSize));
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
          <Next
            page={page}
            allMangaPage={parseInt(categoryPage)}
            path={`/category/${categoryID}/${categoryPage}`}
          />
        </>
      )}
    </div>
  );
};

export default Category;
