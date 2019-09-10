const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/", (req, res) => {
  res.send("Users page");
});

router.get("/:id", (req, res) => {
  db.raw(`SELECT email, password FROM users WHERE id = ${req.params.id}`)
    .then(results => {
      if (results.rows.length === 0) {
        res.send("User not found!");
      } else {
        res.json(results.rows);
      }
    })
    .catch(err => {
      res.send(`There is an error! ${err}`);
    });
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.raw(`SELECT * FROM users WHERE email = ?`, [email])
    .then(results => {
      if (results.rows.length === 0) {
        res.json({ message: "User not found!" });
      } else if (password !== results.rows[0].password) {
        res.json({ message: "Incorrect password!" });
      } else {
        res.send(results.rows);
      }
    })
    .catch(err => {
      res.send(`There is an error! ${err}`);
    });
});

router.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.raw(`SELECT * FROM users WHERE email = ?`, [email]).then(results => {
    if (results.rows.length !== 0) {
      res.json({ message: "User already exists!" });
    } else {
      db.raw(`INSERT INTO users (email, password) VALUES(?, ?) RETURNING *`, [
        email,
        password
      ])
        .then(results => {
          res.send(results.rows);
        })
        .catch(err => {
          res.send(`There is an error! ${err}`);
        });
    }
  });
});

router.post("/:id/forgot-password", (req, res) => {
  const id = req.params.id;
  const password = req.body.password;

  db.raw(`SELECT * FROM users WHERE id = ?`, [id]).then(results => {
    if (results.rows.length === 0) {
      res.json({ message: "User not found!" });
    } else {
      db.raw(`UPDATE users SET password = ? WHERE id = ? RETURNING *`, [
        password,
        id
      ])
        .then(results => {
          res.send(results.rows);
        })
        .catch(err => {
          res.send(`There is an error! ${err}`);
        });
    }
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  db.raw(`SELECT * FROM users WHERE id = ?`, [id]).then(results => {
    if (results.rows.length === 0) {
      res.json({ message: "User not found!" });
    } else {
      db.raw(`DELETE FROM users WHERE id = ? RETURNING *`, [id])
        .then(results => {
          res.json({ message: `User id: ${id} successfully deleted` });
        })
        .catch(err => {
          res.send(`There is an error! ${err}`);
        });
    }
  });
});

module.exports = router;
