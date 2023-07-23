const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

//Router
const UserRouter = require("./router/UserRouter");


app.use(cors());
app.use(bodyParser.json());

app.use(UserRouter);

app.listen(3002, () => {
    console.log("server has started on port 3002");
})