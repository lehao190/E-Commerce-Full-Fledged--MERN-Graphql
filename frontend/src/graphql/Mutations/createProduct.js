import { gql } from "@apollo/client";

export const PRODUCT_CREATE = gql`
    mutation Product($file: Upload!, $name: String!, $description: String!, $category: String!, $brand: String!, $price: Float!, $countInStock: Int!){
        createProduct(file: $file, name: $name, description: $description, category: $category, brand: $brand, price: $price, countInStock: $countInStock) {
            id
            name
            description
            image
            category
            brand
            price
            countInStock
        }
    }
`;