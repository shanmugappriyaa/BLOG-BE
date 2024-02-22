const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const AppRoutes = require("./src/routes/index.js");

dotenv.config();

const PORT = process.env.PORT;
const app = express();
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "https://shanmu-blog.netlify.app",
    methods: ["GET", "POST","PUT","DELETE"],
    optionSuccessStatus: 200,
  })
);
app.use("/", AppRoutes);

app.listen(PORT, () => console.log(`App is listening ${PORT}`));
