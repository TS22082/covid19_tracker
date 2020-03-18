import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";

function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState({ loaded: false });

  useEffect(() => {
    axios.get("api/news").then(res => {
      setArticles(res.data.articles);
      setLoading({ loaded: true });
    });
  }, []);

  return (
    <div>
      {!loading.loaded ? (
        <Loader />
      ) : (
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-12">
              {articles.map((article, index) => (
                <div className="card mt-2" key={index}>
                  <div className="card-body">
                    <h5 className="card-title">{article.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {article.source.name}
                    </h6>
                    <p className="card-text">{article.content}</p>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-link"
                    >
                      Article link
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default News;
