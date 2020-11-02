const { gql } = require("apollo-server-express");

module.exports = gql `
    scalar DateTime

    type Query {
        _: String
    }

    type Mutation {
        _: String
    }
`;