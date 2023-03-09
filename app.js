const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const checkJwt = require("./auth");

const app = express();

const router = express.Router();

app.use(bodyParser.json());

router.post("/login",   (req, res, next) => {
  const { email } = req.body;
  const token = jwt.sign({
    email: email,
    name: "Murad",
    exp:Math.floor(Date.now() / 1000) * 60,
    issuer: "www.muradtyv.com"
  }, "secretkey"
  )

  res.send(token);
});

router.post("/posts", checkJwt,(req, res, next) => {
  res.send("Hello world...");
});

router.get("/",checkJwt, (req, res, next) => {
  res.send("i am working...");
});

app.use("/", router);

app.listen(3000, () => {
  console.log("ap running in ", 3000);
});
