const express = require("express");

const server = express();

server.listen(3000);

server.use(express.json());

server.get("/", (req, res) => {
  return res.json({ message: "Desafio 1" });
});
