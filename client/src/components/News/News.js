import axios from "axios";
import React, { useEffect, useState } from "react";

import Loader from "../Loader/Loader";

function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState({ loaded: false });
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("api/news").then(res => {
      setArticles(res.data.articles);
      setLoading({ loaded: true });
    });
  }, []);

  function updateText(e) {
    setSearch(e.target.value);
  }

  return (
    <div>
      {!loading.loaded ? (
        <Loader />
      ) : (
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-12">
              <div className="input-group input-group-lg mt-3">
                <input
                  type="text"
                  name="search"
                  value={search}
                  className="form-control"
                  placeholder="Search related to covid-19"
                  onChange={updateText}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                  >
                    Search
                  </button>
                </div>
              </div>
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
