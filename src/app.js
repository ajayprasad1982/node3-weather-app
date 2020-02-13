const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app = express();

const port=process.env.PORT || 3000;
// define path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebars engine and view location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Ajay Prasad"
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Ajay Prasad"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helperText: "It provides the information about the page",
    title: "Help",
    name: "Ajay Prasad"
  });
});

app.get("/weather", (req, res) => {
    if(!req.query.address)
      {
          return res.send({
              error:'You must provide a address term'
          })
      }

      geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        return res.send({error})
            forecast(latitude,longitude,(error,forecastdata)=>{
        
            if(error)
            return res.send({error})
            res.send({
                forecast:forecastdata,
                location,
                address:req.query.address
            })
        })
    })
  });
  app.get("/products", (req, res) => {
      if(!req.query.search)
      {
          return res.send({
              error:'You must provide a search term'
          })
      }
    res.send({
        products:[]
    })
  });

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Help article not found",
    name: "Ajay Prasad"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Page not found",
    name: "Ajay Prasad"
  });
});

// create server
app.listen(port, () => {
  console.log("Server started with the port",port);
});
