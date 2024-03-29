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

    type OrderItem {
        product: Product
        quantity: Int
    }
    
    type Order {
        id: ID!
        orderItems: [OrderItem]
        user: User!
        shipping: Shipping!
        payment: Payment
        totalPrice: Float!
        isPaid: Boolean!
        paidAt: String
        isDelivered: Boolean!
        deliveredAt: String
    }

    input InputOrderItems {
        product: ID!
        quantity: Int!
    }

    extend type Mutation {
        createOrder(
            orderItems: [InputOrderItems]
            address: String!
            city: String!
            postalCode: String!
            country: String!
            paymentMethod: String!
            totalPrice: Float!
        ): Order!

        deleteOrder(id: ID!): Message!
        
        deliverOrder(orderId: ID!): Order!

        payOrder(orderId: ID!, userOrderId: ID!, payerId: ID!):Order!
    }

    extend type Query {
        orders: [Order]
        order(id: ID!): Order
    }
`;