const { gql } = require("apollo-server-express");

module.exports = gql `
    type File {
        filename: String!
        mimetype: String!
        encoding: String!
    }

    extend type Mutation {
        singleUpload(file: Upload!): File!
    }

    extend type Query {
        uploads: [File]
    }

`;