const { gql } = require("apollo-server-express");

module.exports = gql `
    type File {
        filename: String!
        mimetype: String!
        encoding: String!
    }

    type Product {
        id: ID!
        name: String! 
        description: String!
        image: String!
        category: String! 
        brand: String! 
        price: Float! 
        countInStock: Int!
        createdAt: String!
        updatedAt: String!
    }

    type Message {
        message: String!
    }

    extend type Mutation {
        createProduct(file: Upload!, name: String!, description: String!, category: String!, brand: String!, price: Float!, countInStock: Int!): Product!
        deleteProduct(id: ID!, filename: String!): Message!
    }

    extend type Query {
        uploads: [File]
        products: [Product]
        product(id: ID!): Product
    }

`;