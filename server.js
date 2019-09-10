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

// app.post("/users", (req, res) => {
//   const body = req.body;
//   const username = body.username;

//   db.raw("INSERT INTO users (username) VALUES(?) RETURNING *", [username])
//     .then(results => {
//       res.status(200).json({ user: results.rows });
//     })
//     .catch(err => {
//       res.status(500).json({ message: err.message });
//     });
// });

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
