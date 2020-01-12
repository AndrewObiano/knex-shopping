const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/", (req, res) => {
  db.raw(`SELECT * FROM products`).then(results => {
    res.json(results.rows);
  });
});

router.get("/:id", (req, res) => {
  if (req.params.id && isNaN(parseInt(req.params.id)) === false) {
    db.raw(`SELECT * FROM products WHERE id = ${req.params.id}`)
      .then(results => {
        if (results.rows.length === 0) {
          res.json({ message: "Product not found!" });
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

router.post("/new", (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const inventory = req.body.inventory;
  const price = req.body.price;

  if (
    title &&
    description &&
    inventory &&
    price &&
    typeof title === "string" &&
    typeof description === "string" &&
    isNaN(parseInt(inventory)) === false &&
    isNaN(parseInt(price)) === false
  ) {
    db.raw(`SELECT * FROM products WHERE title = ?`, [title]).then(results => {
      if (results.rows.length !== 0) {
        res.json({ message: "Product already exists!" });
      } else {
        return db
          .raw(
            `INSERT INTO products (title, description, inventory, price) VALUES(?, ?, ?, ?) RETURNING *`,
            [title, description, inventory, price]
          )
          .then(results => {
            res.send(results.rows);
          })
          .catch(err => {
            res.send(`There is an error! ${err}`);
          });
      }
    });
  } else {
    res.send("Please make sure your inputs are properly formatted!");
  }
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  const inventory = req.body.inventory;
  const price = req.body.price;

  if (
    title &&
    description &&
    inventory &&
    price &&
    typeof title === "string" &&
    typeof description === "string" &&
    isNaN(parseInt(inventory)) === false &&
    isNaN(parseInt(price)) === false
  ) {
    db.raw(`SELECT * FROM products WHERE id = ?`, [id]).then(results => {
      if (results.rows.length === 0) {
        res.json({ message: "Product not found!" });
      } else {
        return db
          .raw(
            `UPDATE products SET title = ?, description = ?, inventory = ?, price = ? WHERE id = ? RETURNING *`,
            [title, description, inventory, price, id]
          )
          .then(results => {
            res.json({ message: `Product id: ${id} has been updated!` });
          })
          .catch(err => {
            res.send(`There is an error! ${err}`);
          });
      }
    });
  } else {
    res.send("Please make sure your parameters are properly formatted!");
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  if (req.params.id && isNaN(parseInt(req.params.id)) === false) {
    db.raw(`SELECT * FROM products WHERE id = ?`, [id]).then(results => {
      if (results.rows.length === 0) {
        res.json({ message: `Product id: ${id} not found!` });
      } else {
        return db
          .raw(`DELETE FROM products WHERE id = ? RETURNING *`, [id])
          .then(results => {
            res.json({ message: `Product id: ${id} successfully deleted` });
          })
          .catch(err => {
            res.send(`There is an error! ${err}`);
          });
      }
    });
  } else {
    res.send("Please make sure the ID is a number!");
  }
});

module.exports = router;
