import { gql } from "@apollo/client";

export const ORDER_CREATE = gql`
    mutation Order(
            $orderItems: [InputOrderItems],
            $address: String!,
            $city: String!,
            $postalCode: String!,
            $country: String!,
            $paymentMethod: String!,
            $totalPrice: Float!
            )
            {
                createOrder(
                    orderItems: $orderItems,
                    address: $address,
                    city: $city,
                    postalCode: $postalCode,
                    country: $country,
                    paymentMethod: $paymentMethod,
                    totalPrice: $totalPrice
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
                            category
                            brand
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