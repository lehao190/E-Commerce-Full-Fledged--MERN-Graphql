import { gql } from "@apollo/client";

export const PRODUCT_CREATE = gql`
    mutation Product($file: Upload!, $name: String!, $description: String!, $category: String!, $brand: String!, $price: Float!, $countInStock: Int!){
        createProduct(file: $file, name: $name, description: $description, category: $category, brand: $brand, price: $price, countInStock: $countInStock) {
            id
            name
            image
            price
        }
    }
`;

export const PRODUCT_UPDATE = gql`
    mutation Product($id: ID!, $file: Upload!, $name: String!, $description: String!, $category: String!, $brand: String!, $price: Float!, $countInStock: Int!){
        updateProduct(id: $id, file: $file, name: $name, description: $description, category: $category, brand: $brand, price: $price, countInStock: $countInStock) {
            id
            name
            description
            image
            price
            countInStock
            category
            brand
        }
    }
`;

export const PRODUCT_DELETE = gql`
    mutation Product($id: ID!, $filename: String!){
        deleteProduct(id: $id, filename: $filename) {
            message
        }
    }
`;

export const CREATE_PRODUCT_COMMENT = gql`
    mutation Product($productId: ID!,$userId: ID!, $username: String!, $userRating: Int!, $userComment: String!){
        createComment(productId: $productId, userId: $userId, username: $username,userRating: $userRating, userComment: $userComment) {
            id 
            name 
            description 
            image 
            category 
            brand 
            price 
            countInStock
            rating
            numReviews
            users {
                _id
                userId
                username
                userRating
                userComment
                createdAt
            }
            createdAt
            updatedAt
        }
    }
`;