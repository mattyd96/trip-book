const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// routes, sequelize connection and handlebar helpers
const routes = require("./routes");
const sequelize = require("./config/connection");
//const helpers = require('./utils/helpers');

// app
const app = express();
const PORT = process.env.PORT || 3001;

// session
const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// handlebars
const hbs = exphbs.create(/*{ helpers }*/);

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// general middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use(routes);

// sync database and listen
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
