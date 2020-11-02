const { gql } = require("apollo-server-express");

module.exports = gql `
    type User {
        id: ID!,
        username: String!,
        email: String!,
        isAdmin: Boolean!,
        token: String!
    }
    
    extend type Query {
        me: User!
    }

    extend type Mutation {
        login(email: String!, password: String!): User!
        register(username: String!, email: String!, password: String!, confirmPassword: String!): User!
        registerAdmin(username: String!, email: String!, password: String!, confirmPassword: String!): User!
    }
`;