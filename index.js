const express = require("express");
const studentRouter = require("./routers/studentRoute");

const app = express();

app.use(express.json());

app.use("/api/student", studentRouter);

app.get("/", (req, res) => {
  res.send("Express server !");
});

// Server port is define

const portNO = 3000;

app.listen(portNO, () => {
  console.log("Server is start !");
});
