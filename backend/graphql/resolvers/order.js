const Order = require("../../models/orderSchema");
const { tokenValidator } = require("../../config/jwtAuth");
const { checkAuth } = require("../../config/authCheck");
const { UserInputError } = require("apollo-server-express");

module.exports = {
    Query: {
        async orders() {
            const orders = await Order.find();
            
            return orders;
        }
    },

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
        }
    }
}