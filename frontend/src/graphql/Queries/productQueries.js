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
        }
    }
`;