# Covid-19 tracking and news application

This apps main "Map" page will let you track the spread of covid-19. News is available through the navigation bar. On the news page the user will first see all the top news articles related to covid-19 and will be able to search for articles relating to covid-19

# Motivation

I want the info reltaed to covid-19 to be available and the code to be open sourced so anyone can look through and verify non maliceous code or take what they want to make something better/more useful.

# Build Status

In production and available [here](https://covid-19-update.herokuapp.com/)

# Stack

Node, Express, React

# Third Party Apis

[Covid-19 tracking](https://github.com/ExpDev07/coronavirus-tracker-api)

[NewsApi](https://newsapi.org/)

[GoogleMaps](https://cloud.google.com/maps-platform/?utm_source=google&utm_medium=cpc&utm_campaign=FY18-Q2-global-demandgen-paidsearchonnetworkhouseads-cs-maps_contactsal_saf&utm_content=text-ad-none-none-DEV_c-CRE_274433407141-ADGP_Hybrid+%7C+AW+SEM+%7C+BKWS+~+Google+Maps+API-KWID_43700033921822021-kwd-335425467-userloc_9032066&utm_term=KW_google%20maps%20api-ST_google+maps+api&gclid=Cj0KCQjw09HzBRDrARIsAG60GP9Jl_O6GNDsFNFGaJp5m8uxXSSCT84OysFnqLJqUDcZ5aDUX3iz0wEaAsqZEALw_wcB)

# Setup

You will need an to generate a developement api key for the NewsApi and Google Maps.

Create a .env file in the client folder:

/client/.env

```javascript
REACT_APP_MAP_KEY = your_google_maps_key_goes_here;
```

Create a .env in the root folder (no quotes)

```javascript
NEWS_KEY = your_news_key_goes_here;
```
