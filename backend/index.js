const connectToMongo = require("./db");
const express = require("express");
connectToMongo();
const app = express()
const port = 3000;

app.use(express.json())  // request kii body mai content dekhne ke liye iss middleware ka use karte hai

//available routes
app.use("/api/auth", require("./routes/auth")); // app.use() is used for routes
app.use("/api/notes", require("./routes/notes"));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
