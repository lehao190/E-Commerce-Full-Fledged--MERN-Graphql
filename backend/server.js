// Load Variable Environment
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const app = express(); 

// PORT
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
const connectMongoDB = require("./db");
connectMongoDB();

// Cross-Origin
var corsOptions = {
    origin: "http://localhost:3000",
    credentials: true 
};
app.use(cors(corsOptions));

// Session Cookies
app.use(session({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: false,
        httpOnly: true,
        secure: false,
        maxAge: 24 * 24 * 60 * 1000
    }
}));

// Static Files
app.use("/public", express.static("public"));

// Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => {
        return {
            req,
            res
        }
    }
});

server.applyMiddleware({
    app,
    cors: false
});

// Server listening port
app.listen(PORT, () => console.log("Server listenig on port: " + PORT));