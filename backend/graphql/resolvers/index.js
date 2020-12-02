const user = require("./user");
const products = require("./products");
const order = require("./order");
const User = require("../../models/userSchema");
const Product = require("../../models/productSchema");
const Order = require("../../models/orderSchema");

module.exports = {
    // Order Resolver
    Order: {
        // Resolve Order Objects
        async orderItems(order) {
            const { orderItems } = await Order.findOne({
                _id: order._id
            }).populate({
                path: "orderItems",
                populate: {
                    path: "product",
                    model: "Product"
                }
            }).populate("user");

            return orderItems;
        },

        // Resolve User
        async user(order) {
            const user = await User.findOne({
                _id: order.user
            });

            return user;
        }
    },

    // Product Resolver
    Product: {
        // Resolve User's Comment
        async users(product) {
            return product.users;
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