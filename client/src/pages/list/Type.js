import React, { useEffect, useState } from "react";
import { get } from "../../api/Api";
import { useParams } from "react-router-dom";
import ProductList from "../../components/list/ProductList";

const Type = () => {
  const { typeID } = useParams();
  const [type, setType] = useState();
  const [collections, setCollections] = useState();

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
      .fetchCollections(typeID)
      .then((response) => {
        setCollections(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [typeID]);

  return (
    <div className="type-page-container">
      {type && (
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
          {collections && <ProductList datas={collections} />}
        </>
      )}
    </div>
  );
};

export default Type;
