const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;

  const user = users.find((user) => user.username === username);

  if (!user) {
    return response.status(404).json({ error: "Usuário não encontrado" });
  }

  request.user = user;

  return next();
}

app.get("/users", (req, res) => {
  return res.json(users);
});

app.post("/users", (request, response) => {
  const { name, username } = request.body;

  const hasUser = users.some((user) => user.username === username);

  if (hasUser) {
    return response.status(400).json({ error: "Usuário já existente" });
  }

  const newUser = {
    id: uuidv4(),
    name,
    username,
    todos: [],
  };

  users.push(newUser);

  return response.status(201).json(newUser);
});

app.get("/todos", checksExistsUserAccount, (request, response) => {
  const { user } = request;

  return response.json(user.todos);
});

app.post("/todos", checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { title, deadline } = request.body;

  const todo = {
    id: uuidv4(),
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date(),
  };

  user.todos.push(todo);

  return response.status(201).json(todo);
});

app.put("/todos/:id", checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { id } = request.params;
  const { title, deadline } = request.body;

  const hasTodo = user.todos.find((todo) => todo.id === id);

  if (!hasTodo) {
    return response.status(404).json({ error: "Todo não encontrado" });
  }

  hasTodo.title = title;
  hasTodo.deadline = new Date(deadline);

  return response.json(hasTodo);
});

app.patch("/todos/:id/done", checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { id } = request.params;

  const hasTodo = user.todos.find((todo) => todo.id === id);

  if (!hasTodo) {
    return response.status(404).json({ error: "Todo não encontrado" });
  }

  hasTodo.done = true;

  return response.json(hasTodo);
});

app.delete("/todos/:id", checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { id } = request.params;

  const hasTodoIndex = user.todos.findIndex((todo) => todo.id === id);

  if (hasTodoIndex === -1) {
    return response.status(404).json({ error: "Todo não encontrado" });
  }

  user.todos.splice(hasTodoIndex, 1);

  return response.status(204).send();
});

module.exports = app;
