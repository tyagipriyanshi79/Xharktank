require("./db/connect");
const express = require("express");
const app = express();
const pitches = require("./routes/pitches");
// require('dotenv').config

const port = 8081;

//middleware
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("Shark Tank Backend");
});

app.use("/pitches", pitches);

// app.post('/pitches') - create new pithes
// //counter offer vala bach gya
// app.get('/pitches') - get all pitches
// app.get('/pitches/:id')- get single pitches

const start = async () => {
  try {
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

// app.listen(port,console.log(`Server is listening on port ${port}...`))
start();
