import express from "express";

const app = express()

const PORT = process.env.PORT || 5000;

app.get('/', (request, response) => {
    response.status(201).send({msg: "hello"})
});

app.get('/api/user', (request, response) => {
    response.send([
      { id: 1, username: "anson", displayName: "anson" },
      { id: 2, username: "jack", displayName: "jack" },
    ]);
})

app.listen(PORT, () => {
    console.log(`running on port ${PORT}`)
})

