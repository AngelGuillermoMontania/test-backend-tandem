const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors")

const indexRouter = require("./routes/indexRouter")
const userRouter = require("./routes/userRouter")

const server = express();

// Middlewares
server.use(express.urlencoded({ extended: true }));
server.use(express.json({ limit: "50mb" }));
server.use(morgan("dev"))  // messages by console
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});
server.use(helmet())
server.use(cors())


// Routes
server.use("/", indexRouter)
server.use("/user", userRouter)

// Error catching endware.
server.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});

module.exports = server