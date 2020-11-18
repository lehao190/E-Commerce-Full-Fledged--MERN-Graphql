const user = require("./user");
const products = require("./products");
const order = require("./order");

module.exports = {
    Query: {
        ...user.Query,
        ...products.Query,
        ...order.Query
    },

    Mutation: {
        ...user.Mutation,
        ...products.Mutation,
        ...order.Mutation
    }
};