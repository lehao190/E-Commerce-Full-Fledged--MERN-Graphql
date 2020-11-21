const user = require("./user");
const products = require("./products");
const order = require("./order");
const Product = require("../../models/productSchema");
const User = require("../../models/userSchema");

module.exports = {
    Order: {
        async orderItems(order) {
            const products = await Product.find({
                _id: order.orderItems.map(orderItem => orderItem.product)
            })

            return products;
        },

        async user(order) {
            const user = await User.findOne({
                _id: order.user
            });

            return user;
        }
    },

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