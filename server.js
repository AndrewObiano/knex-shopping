const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database");
const app = express();

const usersRoute = require("./routes/users.js");
const productsRoute = require("./routes/products.js");
const cartsRoute = require("./routes/carts.js");

const PORT = 3000;

app.use(bodyParser.json());

app.use("/users", usersRoute);
app.use("/products", productsRoute);
app.use("/carts", cartsRoute);

app.get("/", (req, res) => {
  res.send("smoke test");
});

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
