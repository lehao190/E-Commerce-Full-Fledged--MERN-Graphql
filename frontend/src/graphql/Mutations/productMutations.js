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