const axios = require("axios");
require("dotenv").config();

const news_key = process.env.NEWS_KEY;

module.exports = {
  getNews: function(req, res) {
    axios
      .get(`http://newsapi.org/v2/top-headlines?q=covid-19&apiKey=${news_key}`)
      .then(newsArticles => {
        res.json(newsArticles.data);
      })
      .catch(err => res.send(err));
  }
};
