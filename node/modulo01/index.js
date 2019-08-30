const express = require("express");

const server = express();

server.use(express.json());

// Query params = ?users=1
// Routes params = /users/1
// Resquest body = { name: "Diego", email: "diego@rocketseat.com.br" }

// CRUD Create, Read, Update, Delete

const users = ["Diego", "Cláudio", "Victor"];

server.use((req, res, next) => {
  console.log(`Método: ${req.method}, URL: ${req.url}`);

  return next();
});

function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User name is missing" });
  }

  return next();
}

function checkUserInArray(req, res, next) {
  const { index } = req.params;
  const user = users[index];

  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  req.user = user;

  return next();
}

server.get("/users", (req, res) => {
  return res.json(users);
});

server.get("/users/:index", checkUserInArray, (req, res) => {
  return res.json(req.user);
});

server.post("/users", checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

server.put("/users/:index", checkUserExists, checkUserInArray, (req, res) => {
  const { name } = req.body;
  const { index } = req.params;

  users[index] = name;
  return res.json(users);
});

server.delete("/users/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);
  return res.json();
});

server.listen(3000);
