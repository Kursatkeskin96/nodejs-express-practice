import express from "express";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

const mockUsers = [
  { id: 1, username: "anson", displayName: "anson" },
  { id: 2, username: "jack", displayName: "jack" },
];

app.get("/", (request, response) => {
  response.status(201).send({ msg: "hello" });
});

app.get("/api/user", (request, response) => {
  console.log(request.query);
  const {
    query: { filter, value },
  } = request;
  // when filter and value are undefined
  if (filter && value)
    return response.send(
      mockUsers.filter((user) => user[filter].includes(value))
    );
  return response.send(mockUsers);
});

app.post("/api/user", (request, response) => {
  console.log(request.body);
  const { body } = request;
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
  mockUsers.push(newUser);
  return response.status(201).send(newUser);
});

app.get("/api/user/:id", (request, response) => {
  console.log(request.params);
  const parsedId = parseInt(request.params.id);
  if (isNaN(parsedId))
    return response.status(400).send({ msg: "Bad request. Invalid ID" });

  const findUser = mockUsers.find((user) => user.id === parsedId);
  if (!findUser) return response.sendStatus(404);
  return response.send(findUser);
});

app.put("/api/user/:id", (request, response) => {
  const {
    body,
    params: { id },
  } = request;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return response.sendStatus(400);

  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);

  if (findUserIndex === -1) return response.sendStatus(404);

  mockUsers[findUserIndex] = { id: parsedId, ...body };
  return response.sendStatus(200);
});

app.patch("/api/user/:id", (request, response) => {
  const {
    body,
    params: { id },
  } = request;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return response.sendStatus(400);

  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);

  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  return response.sendStatus(200);
});

app.delete("/api/user/:id", (request, response) => {
  const {
    params: { id },
  } = request;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return response.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId)
  if (findUserIndex === -1) return response.sendStatus(404)
  mockUsers.splice(findUserIndex, 1)
  return response.sendStatus(200)
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
