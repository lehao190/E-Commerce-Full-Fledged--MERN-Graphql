const { gql } = require("apollo-server-express");

module.exports = gql`
    type Shipping {
        address: String!
        city: String!
        postalCode: String!
        country: String!
    }

    type Payment {
        paymentMethod: String
        orderId: String
        payerId: String
        paymentId: String
    }
    
    type Order {
        orderItems: [Product]
        user: User!
        shipping: Shipping!
        payment: Payment
        totalPrice: Float!
        isPaid: Boolean!
        paidAt: String
        isDelivered: Boolean!
        deliveredAt: String
    }

    extend type Mutation {
        createOrder(
            productIds: [ID]!
            address: String!
            city: String!
            postalCode: String!
            country: String!
            paymentMethod: String!
            totalPrice: Float!
        ): Order! 
    }

    extend type Query {
        orders: [Order]
    }
`;