import { gql } from "@apollo/client";

export const PRODUCTS = gql`
    query Products{
        products {
            id
            name
            image
            price
            category
            brand
            rating
            numReviews
        }
    }
`;

export const PRODUCT = gql`
    query Product($id: ID!){
        product(id: $id) {
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