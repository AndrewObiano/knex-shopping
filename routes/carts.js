const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/", (req, res) => {
  res.send("Carts page");
});

router.get("/:user_id", (req, res) => {
  if (req.params.user_id && isNaN(parseInt(req.params.user_id)) === false) {
    db.raw(`SELECT product_id FROM carts WHERE user_id = ${req.params.user_id}`)
      .then(results => {
        if (results.rows.length === 0) {
          res.json({ message: "Cart not found!" });
        } else {
          res.json(results.rows);
        }
      })
      .catch(err => {
        res.send(`There is an error! ${err}`);
      });
  } else {
    res.send("Please make sure the ID is a number!");
  }
});

router.post("/:user_id/:product_id", (req, res) => {
  const user_id = req.params.user_id;
  const product_id = req.params.product_id;

  if (
    user_id &&
    product_id &&
    isNaN(parseInt(user_id)) === false &&
    isNaN(parseInt(product_id)) === false
  ) {
    db.raw(`INSERT INTO carts (user_id, product_id) VALUES(?, ?) RETURNING *`, [
      user_id,
      product_id
    ])
      .then(results => {
        res.json({ success: "true" });
      })
      .catch(err => {
        res.send(`There is an error! ${err}`);
      });
  } else {
    res.send("Please make sure the IDs are numbers!");
  }
});

router.delete("/:user_id/:product_id", (req, res) => {
  const user_id = req.params.user_id;
  const product_id = req.params.product_id;

  if (
    user_id &&
    product_id &&
    isNaN(parseInt(user_id)) === false &&
    isNaN(parseInt(product_id)) === false
  ) {
    db.raw(
      `DELETE FROM carts WHERE user_id = ? AND product_id = ? RETURNING *`,
      [user_id, product_id]
    )
      .then(results => {
        res.json({ success: "true" });
      })
      .catch(err => {
        res.send(`There is an error! ${err}`);
      });
  } else {
    res.send("Please make sure the IDs are numbers!");
  }
});

module.exports = router;
