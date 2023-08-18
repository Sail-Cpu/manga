import React, { useEffect, useState } from "react";
//Api
import { get } from "../../api/ApiManga";
//Components
import ProductList from "../../components/list/ProductList";
import Next from "../../components/navigation/Next";
//Icon
import SearchIcon from "@mui/icons-material/Search";
import { useParams } from "react-router-dom";

const AllMangas = () => {
  const { allMangaPage } = useParams();

  const [allMangas, setAllMangas] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    get
      .fetchMangas("", allMangaPage)
      .then((response) => {
        setAllMangas(response.data);
        setPage(parseInt(response.nbMangas / 100));
        window.scrollTo(0, 0);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [allMangaPage]);

  return (
    <div className="all-product all-mangas">
      <div className="all-product-top">
        <div className="all-product-search-container">
          <input type="text" className="all-product-search" />
          <SearchIcon />
        </div>
      </div>
      <ProductList datas={allMangas} path="/mangas/" />
      <Next page={page} allMangaPage={parseInt(allMangaPage)} />
    </div>
  );
};

export default AllMangas;
