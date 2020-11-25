import React, { useState } from 'react';
import { useMutation } from "@apollo/client";
import { PRODUCT_DELETE } from "../graphql/Mutations/productMutations";
import { PRODUCTS } from '../graphql/Queries/productQueries';
import { ORDER_DELETE } from "../graphql/Mutations/orderMutations";
import { ORDERS } from '../graphql/Queries/orderQueries';

function Item({ product, history, order }) {
    // Delete Product Mutation
    const [deleteProduct] = useMutation(PRODUCT_DELETE);

    // Delete Order Mutation
    const [deleteOrder] = useMutation(ORDER_DELETE);

    const [errors, setErrors] = useState("");

    // Delete Product
    const onDeleteProduct = async () => {
        try {
            await deleteProduct({ 
                variables: { 
                    id: product.id,
                    filename: product.image
                },
                update: (cache) => {
                    const existingProducts = cache.readQuery({
                        query: PRODUCTS
                    });

                    cache.evict({
                        fieldName: "notifications",
                        broadcast: false
                    });

                    cache.writeQuery({
                        query: PRODUCTS,
                        data: {
                            products: existingProducts.products.filter((item) => item.id !== product.id)
                        }
                    });
                    
                    setErrors("");
                },
            });
        } catch (error) {
            setErrors(error.graphQLErrors[0].extensions.errors);
            return null;
        }
    };

    // Delete Order
    const onDeleteOrder = async () => {
        try {
            await deleteOrder({
                variables: {
                    id: order.id
                },
                update: (cache) => {
                    const existingOrders = cache.readQuery({
                        query: ORDERS
                    });

                    cache.evict({
                        fieldName: "notifications",
                        broadcast: false
                    });

                    cache.writeQuery({
                        query: ORDERS,
                        data: {
                            orders: existingOrders.orders.filter((item) => item.id !== order.id)
                        }
                    });
                    
                    setErrors("");
                },
            });
        } catch (error) {
            console.log(error);
            setErrors(error.graphQLErrors[0].extensions.errors);

            return null;
        }
    }

    return (
        <tr>
            <td>
                {errors && errors.isAdmin}
                <h1>{product && product.id}</h1>
                <h1>{order && order.id}</h1>
            </td>

            <td>
                <h1>{ product && product.name }</h1>
                <h1>{ order && order.user.username }</h1>
            </td>

            <td>
                <h1>{product && "$ " + product.price }</h1>
                <h1>{ order && "$ " + order.totalPrice }</h1>
            </td>

            <td>
                <h1>{ product && product.category }</h1>
                
                <h1 style={{
                    color: "red"
                }}>
                    { order && !order.isPaid && "Chưa Trả" }
                </h1>

                <h1 style={{
                    color: "#22bb33"
                }}>{ order && order.isPaid && "Đã Trả" }</h1>
            </td>

            <td>
                <h1>{ product && product.brand }</h1>

                <h1 style={{
                    color: "red"
                }}>
                    { order && !order.isDelivered && "Chưa Giao" }
                </h1>
                
                <h1 style={{
                    color: "#22bb33"
                }}>
                    { order && order.isDelivered && "Đã Giao" }
                </h1>
            </td>

            {
            product &&
                <td>
                    <span onClick={
                        () => {
                            history.push({
                                pathname: `/products/edit/${product.id}`
                            });
                        }
                    } className="edit">
                        <i className="far fa-edit"></i>
                    </span>
                    <span onClick={onDeleteProduct} className="delete"><i className="fas fa-trash"></i></span>
                </td>
            }

            {
            order &&
                <td>
                    <span onClick={
                        () => {
                            history.push({
                                pathname: `/checkout/${order.id}`
                            });
                        }
                    } className="edit">
                        <i className="far fa-edit"></i>
                    </span>
                    <span onClick={onDeleteOrder} className="delete"><i className="fas fa-trash"></i></span>
                </td>
            }
        </tr>
    )
}

export default Item;