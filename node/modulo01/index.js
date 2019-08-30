const express = require("express");

const server = express();

// Query params = ?users=1
// Routes params = /users/1
// Resquest body = { name: "Diego", email: "diego@rocketseat.com.br" }

// CRUD Create, Read, Update, Delete

const users = ["Diego", "Cláudio", "Victor"];

server.use(express.json());

server.get("/users", (req, res) => {
  return res.json(users);
});

server.get("/users/:id", (req, res) => {
  const { id } = req.params;

  return res.json(users[id]);
});

server.post("/users", (req, res) => {
  const { name } = req.body;

  users.push(name);
  return res.json(users);
});

server.put("/users/:index", (req, res) => {
  const { name } = req.body;
  const { index } = req.params;

  users[index] = name;
  return res.json(users);
});

server.delete("/users/:index", (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);
  return res.json();
});

server.listen(3000);
