const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/", (req, res) => {
  db.raw(`SELECT * FROM products`).then(results => {
    res.json(results.rows);
  });
});

router.get("/:id", (req, res) => {
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
});

router.post("/new", (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const inventory = req.body.inventory;
  const price = req.body.price;

  db.raw(`SELECT * FROM products WHERE title = ?`, [title]).then(results => {
    if (results.rows.length !== 0) {
      res.json({ message: "Product already exists!" });
    } else {
      db.raw(
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
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  const inventory = req.body.inventory;
  const price = req.body.price;

  db.raw(`SELECT * FROM products WHERE id = ?`, [id]).then(results => {
    if (results.rows.length === 0) {
      res.json({ message: "Product not found!" });
    } else {
      db.raw(
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
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  db.raw(`SELECT * FROM products WHERE id = ?`, [id]).then(results => {
    if (results.rows.length === 0) {
      res.json({ message: `Product id: ${id} not found!` });
    } else {
      db.raw(`DELETE FROM products WHERE id = ? RETURNING *`, [id])
        .then(results => {
          res.json({ message: `Product id: ${id} successfully deleted` });
        })
        .catch(err => {
          res.send(`There is an error! ${err}`);
        });
    }
  });
});

module.exports = router;
