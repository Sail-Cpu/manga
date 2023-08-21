import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//Components
import CollectionProduct from "../../components/list/CollectionProduct";
//Icons
import SearchIcon from "@mui/icons-material/Search";
import { get } from "../../api/ApiManga";
import Next from "../../components/navigation/Next";

const AllCollections = () => {
  const { allCollectionPage } = useParams();

  const [allCollections, setAllCollections] = useState([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    get
      .fetchCollections(
        "",
        search.length === 0 && allCollectionPage > 0
          ? allCollectionPage - 1
          : 0,
        search
      )
      .then((response) => {
        setAllCollections(response.data);
        setPage(
          search.length > 0 ? 0 : parseInt(response.nbCollections / 10) + 1
        );
        window.scrollTo(0, 0);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [allCollectionPage, search]);

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
      </div>
      <div className="collection-list" key={JSON.stringify(allCollections)}>
        {allCollections.map((collection, idx) => {
          return <CollectionProduct key={idx} collection={collection} />;
        })}
      </div>
      <Next
        page={page}
        allMangaPage={parseInt(allCollectionPage > 0 ? allCollectionPage : 1)}
        path="/allcollections"
      />
    </div>
  );
};

export default AllCollections;
