const express = require("express");

const server = express();

// Query params = ?users=1
// Routes params = /users/1
// Resquest body = { name: "Diego", email: "diego@rocketseat.com.br" }

server.get("/users/:id", (req, res) => {
  const { id } = req.params;

  return res.json({ message: `Buscando o usuário ${id}` });
});

server.listen(3000);
