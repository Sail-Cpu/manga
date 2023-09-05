import React, { useEffect, useState } from "react";
import { get } from "../../api/ApiManga";
import { useParams } from "react-router-dom";
import ProductList from "../../components/list/ProductList";
import Next from "../../components/navigation/Next";

const Type = () => {
  const { typeID, typePage } = useParams();
  const [type, setType] = useState();
  const [collections, setCollections] = useState();
  const [page, setPage] = useState(0);
  const pageSize = 50;

  useEffect(() => {
    get
      .fetchTypeById(typeID)
      .then((response) => {
        setType(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
    get
      .fetchCollections(typeID, "", typePage, "", pageSize, "")
      .then((response) => {
        setCollections(response.data);
        console.log(response.nbCollections);
        setPage(Math.floor(response.nbCollections / pageSize));
        console.log(page);
        window.scrollTo(0, 0);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [typeID, typePage]);

  return (
    <div className="type-page-container">
      {type && collections && (
        <>
          <div className="type-page-container-left">
            <div className="type-page-container-title">
              {type.name.toUpperCase()}
            </div>
            <div
              className="type-page-container-left-background"
              style={{ backgroundImage: `url(${type.background_image})` }}
            ></div>
            <div
              style={{ justifyContent: "flex-end" }}
              className="type-page-container-title"
            >
              {type.japan_name}
            </div>
          </div>
          <ProductList datas={collections} path="/collections/" />
          <Next
            page={page}
            allMangaPage={parseInt(typePage)}
            path={`/types/${typeID}`}
          />
        </>
      )}
    </div>
  );
};

export default Type;
