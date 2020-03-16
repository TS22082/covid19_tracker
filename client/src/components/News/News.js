import React, { useEffect, useState } from "react";
import axios from "axios";

function News() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    axios.get("api/news").then(res => {
      console.log(res.data.articles);
      setArticles(res.data.articles);
    });
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12">
          {articles.map(article => (
            <div className="card mt-2">
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {article.source.name}
                </h6>
                <p className="card-text">{article.content}</p>
                <a href={article.url} target="_blank" className="card-link">
                  Article link
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default News;
