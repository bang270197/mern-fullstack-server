const express = require("express");

const posts = require("./routers/posts.js");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const config = require("config");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;

const URI = process.env.DATABASE_URL;

app.use(cors());
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));

app.use("/posts", posts);
app.get("/", (req, res) => {
    res.send("hello");
});
var port = process.env.PORT || config.get("server.port");
var dbUrlString = `mongodb://${config.get("mongodb.username")}:${config.get(
    "mongodb.password"
)}@${config.get("mongodb.host")}:${config.get("mongodb.port")}/${config.get(
    "mongodb.database"
)}`;
mongoose.connect(dbUrlString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
    console.log("MongoDB connected");
    app.listen(port, "0.0.0.0", () => {
        console.log("Server is running at port:" + port);
        // console.log("Document of apis at: localhost:5000/docs");
    });
});
