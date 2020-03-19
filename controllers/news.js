const axios = require("axios");
require("dotenv").config();

const news_key = process.env.NEWS_KEY;

module.exports = {
  // retrieve all news articles related to covid-19
  getNews: function(req, res) {
    axios
      .get(`http://newsapi.org/v2/top-headlines?q=covid-19&apiKey=${news_key}`)
      .then(newsArticles => {
        res.json(newsArticles.data);
      })
      .catch(err => res.send(err));
  },

  // search articles with rquest criteria related to covid-19
  search: function(req, res) {
    const searchTerm = `${req.params.search} covid-19`;
    axios
      .get(
        `http://newsapi.org/v2/everything?q="${searchTerm}"&apiKey=${news_key}`
      )
      .then(newsArticles => {
        res.json(newsArticles.data);
      })
      .catch(err => res.send(err));
  }
};
