import { gql } from "@apollo/client";

export const ORDER_CREATE = gql`
    mutation Order( 
            $productIds: [ID]!,
            $address: String!,
            $city: String!,
            $postalCode: String!,
            $country: String!,
            $paymentMethod: String!,
            $totalPrice: Float!
            )
            {
                createOrder( 
                    productIds: $productIds,
                    address: $address,
                    city: $city,
                    postalCode: $postalCode,
                    country: $country,
                    paymentMethod: $paymentMethod,
                    totalPrice: $totalPrice
                )
                {
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
                }
            }
`;