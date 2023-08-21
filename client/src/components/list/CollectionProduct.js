import React, { useEffect, useRef, useState } from "react";
import { get } from "../../api/ApiManga";
import { Link } from "react-router-dom";
import MyCollectionManga from "../product/MyCollectionManga";

const CollectionProduct = (props) => {
  const [author, setAuthor] = useState("");
  const [type, setType] = useState("");
  const [mangas, setMangas] = useState([]);

  const minSize = 190.5;
  const productRef = useRef(null);
  const [productSize, setProductSize] = useState({
    width: 0,
    number: 0,
  });
  const pageSize = 100;

  useEffect(() => {
    get
      .fetchAuthorById(props.collection.author_id)
      .then((response) => {
        setAuthor(response.data?.[0].name);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.collection]);

  useEffect(() => {
    get
      .fetchTypeById(props.collection.type_id)
      .then((response) => {
        setType(response.data?.[0].name);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.collection.type_id]);

  useEffect(() => {
    get
      .fetchMangas(props.collection.id, "", "", pageSize)
      .then((response) => {
        setMangas(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.collection, productSize]);

  useEffect(() => {
    if (productRef.current) {
      setProductSize({
        width: productRef.current.offsetWidth,
        number: parseInt(productRef.current.offsetWidth / minSize),
      });
    }
  }, []);

  const handleResize = () => {
    setProductSize({
      width: productRef.current.offsetWidth,
      number: parseInt(productRef.current.offsetWidth / minSize),
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="collection-list-product">
      <div className="collection-list-head">
        <div
          className="collection-list-head-img"
          style={{
            backgroundImage: `url(${props.collection.background_images?.[0]})`,
          }}
        ></div>
        <h1>{props.collection.name}</h1>
        <div className="collection-list-head-info">
          <span>{author}</span>
          <span>{type}</span>
        </div>
      </div>
      <div className="collection-list-product-content">
        <div className="collection-list-product-content-top" ref={productRef}>
          {mangas.slice(0, productSize.number).map((manga, idx) => {
            return <MyCollectionManga key={idx} manga={manga} />;
          })}
        </div>
        <div className="collection-list-product-content-bottom">
          <Link to={`/collections/${props.collection.id}`}>
            <h2>See More</h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CollectionProduct;
