import { gql } from "@apollo/client";

export const ORDER = gql`
    query Order(
        $id: ID!
    )
    {
        order(
            id: $id,
        )
        {
            id
            totalPrice
            isPaid
            paidAt
            isDelivered
            deliveredAt
            shipping {
                address
                city
                postalCode
                country
            }
            payment {
                paymentMethod
            }
            orderItems {
                product {
                    id
                    name
                    image
                    price
                    countInStock
                }
                quantity
            }
            user {
                id
                username
                email
                isAdmin
            }
        }
    }
`;