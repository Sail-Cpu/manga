import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//Components
import CollectionProduct from "../../components/list/CollectionProduct";
import Select from "../../components/api_form/inputs/Select";
//Icons
import SearchIcon from "@mui/icons-material/Search";
import { get } from "../../api/ApiManga";
import Next from "../../components/navigation/Next";

const AllCollections = () => {
  const { allCollectionPage } = useParams();

  const [allCollections, setAllCollections] = useState([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const pageSize = 10;

  const [sort, setSort] = useState("Name");
  const values = ["Nom", "Année", "Note"];

  useEffect(() => {
    let sortValue = "";
    if (sort === "Nom") {
      sortValue = "name";
    } else if (sort === "Année") {
      sortValue = "year";
    } else {
      sortValue = "critic";
    }
    get
      .fetchCollections(
        "",
        "",
        search.length === 0 ? allCollectionPage : 0,
        search,
        pageSize,
        sortValue
      )
      .then((response) => {
        setAllCollections(response.data);
        console.log(response.nbCollections);
        setPage(
          search.length > 0 ? 0 : Math.floor(response.nbCollections / pageSize)
        );
        console.log(page);
        window.scrollTo(0, 0);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [allCollectionPage, search, sort]);

  return (
    <div className="all-product all-collections">
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
      <div className="collection-list" key={JSON.stringify(allCollections)}>
        {allCollections.map((collection, idx) => {
          return <CollectionProduct key={idx} collection={collection} />;
        })}
      </div>
      <Next
        page={page}
        allMangaPage={parseInt(allCollectionPage)}
        path="/allcollections"
      />
    </div>
  );
};

export default AllCollections;
