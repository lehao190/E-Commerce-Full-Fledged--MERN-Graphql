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

export const ORDER_DELETE = gql`
    mutation Order(
                $id: ID!
            )
            {
                deleteOrder(
                    id: $id
                )
                {
                    message
                }
            }
`;

export const ORDER_DELIVER = gql`
    mutation Order(
                $orderId: ID!
            )
            {
                deliverOrder(
                    orderId: $orderId
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

export const PAY_ORDER = gql`
    mutation Order(
                $orderId: ID!
                $userOrderId: ID!
                $payerId: ID!
            )
            {
                payOrder(
                    orderId: $orderId
                    userOrderId: $userOrderId
                    payerId: $payerId
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