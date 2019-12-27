const express = require("express");

const app = express();

const mongoConnect = require("./utils/database").mongoConnect;

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).send("<h1>Oh oh, this page does not exist</h1>");
});

mongoConnect(()=> { 
    app.listen(3000);
});
