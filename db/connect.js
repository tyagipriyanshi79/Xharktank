const mongoose = require("mongoose");

const connectionString = "mongodb://127.0.0.1:27017/Xharktank-data";

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(" successfully mongoDB connected!");
  });
