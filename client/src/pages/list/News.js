import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//Api
import { get } from "../../api/ApiManga";
//Images
import NewsImage from "../../assets/img/news.jpg";
import ProductList from "../../components/list/ProductList";
import Next from "../../components/navigation/Next";

const News = () => {
  const { newsPage } = useParams();
  const pageSize = 50;
  const [page, setPage] = useState(0);
  const date = "2023-01-01";
  const [newMangas, setNewMangas] = useState([]);

  useEffect(() => {
    get
      .fetchMangas("", newsPage > 0 ? newsPage - 1 : 0, "", pageSize, date, "")
      .then((response) => {
        setNewMangas(response.data);
        setPage(Math.ceil(response.nbMangas / pageSize));
        window.scrollTo(0, 0);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [newsPage]);

  console.log(newsPage);

  return (
    <div className="news-page">
      <div className="news-page-top">
        <div
          className="news-page-top-left"
          style={{ backgroundImage: `url(${NewsImage})` }}
        >
          <div className="news-page-top-back"></div>
          <h1>NEWS</h1>
        </div>
        <div
          className="news-page-top-right"
          style={{ backgroundImage: `url(${NewsImage})` }}
        >
          <div className="news-page-top-back"></div>
        </div>
      </div>
      <div className="news-page-content">
        <ProductList datas={newMangas} path="/mangas/" />
        <Next page={page} allMangaPage={parseInt(newsPage)} path="/news" />
      </div>
    </div>
  );
};

export default News;
