const user = require("./user");
const products = require("./products");

module.exports = {
    Query: {
        ...user.Query,
        ...products.Query,
    },

    Mutation: {
        ...user.Mutation,
        ...products.Mutation
    }
};