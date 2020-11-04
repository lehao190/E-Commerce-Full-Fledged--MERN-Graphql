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

    extend type Mutation {
        createProduct(file: Upload!, name: String!, description: String!, category: String!, brand: String!, price: Float!, countInStock: Int!): Product!
    }

    extend type Query {
        uploads: [File]
        products: [Product]
    }

`;