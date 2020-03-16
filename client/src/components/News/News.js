import React, { useEffect } from "react";
import axios from "axios";

function News() {
  useEffect(() => {
    axios.get("api/news").then(res => console.log(res.data.articles));
  }, []);

  return (
    <div>
      <h1>hello</h1>
    </div>
  );
}

export default News;
