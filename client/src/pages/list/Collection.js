import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { get } from "../../api/Api";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Stars from "../../components/other/Stars";
import ProductList from "../../components/list/ProductList";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

const Collection = () => {
  const { collectionId } = useParams();
  const navigate = useNavigate();
  const { getToken } = useContext(UserContext);

  const [isLiked, setIsLiked] = useState(false);
  const [collection, setCollection] = useState();
  const [categories, setCategories] = useState([]);
  const [author, setAuthor] = useState();
  const [type, setType] = useState();
  const [mangasList, setMangaList] = useState();

  const [delimited, setDelimited] = useState(true);

  const fetchUserById = async () => {
    const endpoint = `http://localhost:3002/users/${getToken()?.id}`;
    return await (
      await axios.get(endpoint)
    ).data;
  };

  useEffect(() => {
    if (getToken()) {
      fetchUserById()
        .then((response) => {
          if (response.collectionsLikes.includes(parseInt(collectionId))) {
            setIsLiked(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [collectionId]);

  useEffect(() => {
    get
      .fetchCollection(collectionId)
      .then((response) => {
        setCollection(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [collectionId]);

  useEffect(() => {
    if (collection?.author_id) {
      get
        .fetchAuthorById(collection.author_id)
        .then((response) => {
          setAuthor(response.data[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [collection?.author_id]);

  useEffect(() => {
    if (collection?.type_id) {
      get
        .fetchTypeById(collection.type_id)
        .then((response) => {
          setType(response.data[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [collection?.type_id]);

  useEffect(() => {
    if (collection?.id) {
      get
        .fetchMangas(collection.id)
        .then((response) => {
          setMangaList(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [collection?.id]);

  useEffect(() => {
    if (collection?.id) {
      for (let i = 0; i < collection.category_ids.length; i++) {
        get
          .fetchCategoryById(collection.category_ids[i])
          .then((response) => {
            setCategories((categories) => [...categories, response.data[0]]);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [collection?.id]);

  function TextDelimited(text) {
    if (delimited) {
      return text.substring(0, 1100) + "...";
    }
    if (!delimited) {
      return text;
    }
  }

  const likeConfig = {
    method: "post",
    url: "http://localhost:3002/like",
    data: {
      type: "collections",
      user_id: getToken()?.id,
      product_id: collectionId,
    },
  };

  const dislikeConfig = {
    method: "delete",
    url: "http://localhost:3002/like",
    data: {
      type: "collections",
      user_id: getToken()?.id,
      product_id: collectionId,
    },
  };

  const like = async (e) => {
    if (!getToken()) {
      navigate("/sign/signin");
      return;
    }
    if (!isLiked) {
      axios(likeConfig)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios(dislikeConfig)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="collection-container">
      {collection && author && type && mangasList && (
        <div className="collection">
          <div className="collection-head">
            <div className="collection-head-block-container">
              <div
                className="collection-head-img"
                style={{
                  backgroundImage: `url(${collection.background_images[0]})`,
                }}
              ></div>
              <div className="collection-head-content">
                <div className="head-content-top">
                  <span style={{ color: "#A5ADAF" }}>{author.name}</span>
                  <span>{type.name}</span>
                </div>
                <div className="head-content-middle">
                  <h1>{collection.name}</h1>
                </div>
                <div className="head-content-bottom">
                  <span>{collection.year}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="collection-long-bar"></div>
          <div className="collection-info">
            <div className="collection-info-left">
              <div className="collection-info-like">
                {!getToken() || !isLiked ? (
                  <FavoriteBorderIcon
                    className="heart"
                    onClick={(e) => like(e)}
                  />
                ) : (
                  <FavoriteIcon className="heart" onClick={(e) => like(e)} />
                )}
                <Stars critic={(collection.critic / 2).toFixed(1)} />
              </div>
              <div className="collection-info-bonus">
                {categories.map((category, idx) => {
                  return (
                    <div key={idx} className="info-bonus">
                      <span>
                        {category.name.charAt(0).toUpperCase() +
                          category.name.slice(1)}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="collection-info-bonus">
                <div
                  className="info-bonus"
                  style={{ backgroundColor: "#798b91" }}
                >
                  <span>{collection.nb_mangas}</span>
                </div>
              </div>
            </div>
            <div className="collection-info-right">
              {
                <div
                  dangerouslySetInnerHTML={{
                    __html: TextDelimited(collection.description),
                  }}
                />
              }
              {delimited ? (
                <span onClick={() => setDelimited(false)}>more</span>
              ) : (
                <span onClick={() => setDelimited(true)}>less</span>
              )}
            </div>
          </div>
          <div className="collection-short-bar"></div>
          <ProductList datas={mangasList} path="/mangas/" />
        </div>
      )}
    </div>
  );
};

export default Collection;
