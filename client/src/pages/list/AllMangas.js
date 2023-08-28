import React, { useEffect, useState } from "react";
//Api
import { get } from "../../api/ApiManga";
//Components
import ProductList from "../../components/list/ProductList";
import Next from "../../components/navigation/Next";
//Icon
import SearchIcon from "@mui/icons-material/Search";
import { useParams } from "react-router-dom";
import Select from "../../components/api_form/inputs/Select";

const AllMangas = () => {
  const { allMangaPage } = useParams();

  const [allMangas, setAllMangas] = useState([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const pageSize = 100;

  const [sort, setSort] = useState("Name");
  const values = ["Nom", "Date"];

  useEffect(() => {
    let sortValue = "";
    if (sort === "Nom") {
      sortValue = "name";
    } else {
      sortValue = "Date";
    }
    get
      .fetchMangas(
        "",
        search.length === 0 && allMangaPage > 0 ? allMangaPage - 1 : 0,
        search,
        pageSize,
        "",
        sortValue
      )
      .then((response) => {
        setAllMangas(response.data);
        setPage(
          search.length > 0 ? 0 : Math.ceil(response.nbMangas / pageSize)
        );
        window.scrollTo(0, 0);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [allMangaPage, search, sort]);

  console.log(page);

  return (
    <div className="all-product all-mangas">
      <div className="all-product-top">
        <div className="all-product-search-container">
          <input
            value={search}
            type="text"
            className="all-product-search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchIcon />
        </div>
        <Select name="Filtre" values={values} state={setSort} />
      </div>
      <ProductList datas={allMangas} path="/mangas/" />
      <Next
        page={page}
        allMangaPage={parseInt(allMangaPage)}
        path="/allmangas"
      />
    </div>
  );
};

export default AllMangas;
