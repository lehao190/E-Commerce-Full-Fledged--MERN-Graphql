const Order = require("../../models/orderSchema");
const Product = require("../../models/productSchema");
const { tokenValidator } = require("../../config/jwtAuth");
const { checkAuth } = require("../../config/authCheck");
const { UserInputError } = require("apollo-server-express");

module.exports = {
    // Order Queries
    Query: {
        // Find all orders
        async orders(_, __, { req }) {
            console.log("Orders Query get Called !!!");

            // Check for token
            const user = await checkAuth(req, tokenValidator);

            if(user.isAdmin) {
                const orders = await Order.find().sort("-createdAt");
            
                return orders;
            }

            const userOrders = await Order.find({
                user: user._id
            }).sort("-createdAt");
            
            return userOrders;
        },

        // Find Order by id
        async order(_, { id }, { req }) {
            console.log("Order Query get Called !!!");

            // Check for token
            const user = await checkAuth(req, tokenValidator);

            // Check if user is Admin
            if(!user) {
                throw new UserInputError("Errors when creating order", {
                    errors: {
                        isUser: "Người dùng không tồn tại"
                    }
                })
            }

            // find order
            const order = await Order.findOne({
                _id: id
            });

            return order;
        }
    },

    // Order Mutations
    Mutation: {
        // Create User's Order
        async createOrder(_, {
            orderItems,
            address,
            city,
            postalCode,
            country,
            paymentMethod,
            totalPrice
        }, { req }) {
            console.log("Create Order Mutation get Called !!!");
            
            // Check for token
            const user = await checkAuth(req, tokenValidator);

            // Check if user is Admin
            if(!user) {
                throw new UserInputError("Errors when creating order", {
                    errors: {
                        isUser: "Người dùng không tồn tại"
                    }
                })
            }

            const order = new Order({
                orderItems: [
                    ...orderItems
                ],
                user: user.id,
                shipping: {
                    address,
                    city,
                    postalCode,
                    country,
                },
                payment: {
                    paymentMethod
                },
                totalPrice
            });

            await order.save();

            // Update Product's Stock
            orderItems.forEach(async orderItem => {
                // Find product
                const product = await Product.findOne({
                    _id: orderItem.product
                });

                // Update The Stock
                await Product.findOneAndUpdate(
                    {
                        _id: orderItem.product
                    },
                    {
                        countInStock: product.countInStock - orderItem.quantity
                    },
                    {
                        new: true
                    }
                );
            })

            // Return the Order
            const newOrder = await Order.findOne({
                _id: order.id
            }).populate({
                path: "orderItems",
                populate: {
                    path: "product",
                    model: "Product"
                }
            }).populate("user");

            return {
                id: newOrder._id,
                ...newOrder._doc
            }
        },

        // Delete User's Order
        async deleteOrder(_, { id }, { req }) {
            console.log("Delete Order Mutation gets called !!!");
            
            // Check for token
            const user = await checkAuth(req, tokenValidator);

            // Check if user is Admin
            if(!user) {
                throw new UserInputError("Errors when creating order", {
                    errors: {
                        isUser: "Người dùng không tồn tại"
                    }
                })
            }

            // Find and delete User's Order
            await Order.deleteOne({
                _id: id
            });

            return {
                message: "Delete Order Successfully YaHOOO !!!"
            }
        }
    }
}