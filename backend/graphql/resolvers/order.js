const Order = require("../../models/orderSchema");
const Product = require("../../models/productSchema");
const { tokenValidator } = require("../../config/jwtAuth");
const { checkAuth } = require("../../config/authCheck");
const { validCountInStock } = require("../../config/validate");
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

            // Check for Product Stock
            const validOrder = await new Promise(async (resolve) => {
                const order = await orderItems.map(async (orderItem) => {
                    const product = await Product.findOne({
                        _id: orderItem.product
                    });

                    let orderQuantity = product.countInStock - orderItem.quantity;

                    return orderQuantity;
                });

                Promise.all(order).then((result) => {
                    resolve(result);
                });
            });

            // Check if Product Stock > 0
            const isOrderValid = validOrder.filter(item => item < 0);

            // Throw Error if Order's quantity - Product's CountInStock < 0
            if(isOrderValid.length > 0) {
                throw new UserInputError("Errors when creating order", {
                    errors: {
                        quantity: "Số lượng sản phẩm lớn hơn số lượng tồn kho !!!"
                    }
                });
            }

            //  Update Product's Stock if > 0
            orderItems.forEach( async orderItem => {
                // Find product
                const product = await Product.findOne({
                    _id: orderItem.product
                });

                // Update Product's Stock
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
            });

            // Create Order
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
        },

        // Deliver Order
        async deliverOrder(_, { orderId }, { req }) {
            console.log("Deliver Order Mutation get Called !!!");
            
            // Check for token
            const user = await checkAuth(req, tokenValidator);

            // Check if user is Admin
            if(!user.isAdmin) {
                throw new UserInputError("Errors when creating order", {
                    errors: {
                        isAdmin: "Không phải Admin"
                    }
                })
            }

            const order = await Order.findOne({
                _id: orderId
            });

            order.isDelivered = true;

            order.deliveredAt = new Date().toISOString();

            await order.save();

            return {
                id: order._id,
                ...order._doc
            }
        },

        // Pay Order
        async payOrder(_, { orderId, userOrderId, payerId }, { req }) {
            console.log("Pay Order Mutation get Called !!!");
            
            // Check for token
            const user = await checkAuth(req, tokenValidator);

            // Check if user is Admin
            if(user.isAdmin) {
                throw new UserInputError("Errors when creating order", {
                    errors: {
                        isAdmin: "Admin Không Thể Trả Tiền"
                    }
                })
            }

            const order = await Order.findOne({
                _id: orderId
            });

            order.isPaid = true;

            order.paidAt = new Date().toISOString();

            order.payment.orderId = userOrderId;

            order.payment.payerId = payerId;

            await order.save();

            return {
                id: order._id,
                ...order._doc
            }
        }
    }
}