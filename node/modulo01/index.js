const express = require("express");

const server = express();

server.get("/teste", (req, res) => {
  console.log("teste");
  res.json({ message: "Hello World" });
});

server.listen(3000);
