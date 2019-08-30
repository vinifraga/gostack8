const express = require("express");
const server = express();
const projects = [];
let reqCount = 0;

server.listen(3000);
server.use(express.json());
server.use((req, res, next) => {
  console.log(`${reqCount++} requisições feitas até o momento.`);

  return next();
});

checkProjectId = (req, res, next) => {
  const { id } = req.params;
  const index = projects.findIndex(value => value.id === id);

  if (index === -1) {
    return res.status(400).json({ error: "Project not found" });
  }
  req.index = index;

  return next();
};

server.post("/projects", (req, res, next) => {
  const { id, title } = req.body;

  projects.push({ id, title, tasks: [] });

  return res.status(200).json({ message: "Projeto adicionado com sucesso" });
});

server.get("/projects", (req, res) => {
  return res.status(200).json(projects);
});

server.put("/projects/:id", checkProjectId, (req, res) => {
  const { title } = req.body;

  projects[req.index].title = title;

  return res.status(200).json({ message: "Projeto atualizado" });
});

server.delete("/projects/:id", checkProjectId, (req, res) => {
  projects.splice(req.index, 1);

  return res.status(200).json({ message: "Projeto deletado" });
});

server.post("/projects/:id/tasks", checkProjectId, (req, res) => {
  const { title } = req.body;

  projects[req.index].tasks.push(title);

  return res.status(200).json({ message: "Task adicionada" });
});
