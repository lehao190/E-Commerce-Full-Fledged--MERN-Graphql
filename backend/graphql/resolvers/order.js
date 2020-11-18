const Order = require("../../models/orderSchema");
const { tokenValidator } = require("../../config/jwtAuth");
const { checkAuth } = require("../../config/authCheck");
const { UserInputError } = require("apollo-server-express");

module.exports = {
    Query: {
        async orders() {
            const a = await Order.find();
            
            return a
        }
    },

    Mutation: {
        // Create User's Order
        async createOrder(_, {
            productIds,
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
                    ...productIds
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
            }).populate("orderItems").populate("user");

            return {
                ...newOrder._doc,
            }
        }
    }
}