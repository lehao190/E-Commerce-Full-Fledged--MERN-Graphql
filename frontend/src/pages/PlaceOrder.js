import React, { useContext, useEffect, useState } from 'react';
import CartProducts from '../components/CartProducts';
import { cartItemsContext } from '../context/cartItemsContext';
import Cookies from "js-cookie";
import { useMutation, useQuery } from "@apollo/client";
import { ORDER_CREATE } from '../graphql/Mutations/orderMutations';
import { ORDERS } from '../graphql/Queries/orderQueries';

function PlaceOrder(props) {
    const isLoggedIn = Cookies.getJSON("isLoggedIn");

    const [errors, setErrors] = useState("");

    // Fetch Orders
    useQuery(ORDERS);

    // Check if user Logged In
    useEffect(() => {
        if(!isLoggedIn.state) props.history.push({
            pathname: "/login"
        });
    }, [isLoggedIn.state, props.history]);

    // Get Cart Items from Store
    const cartContext = useContext(cartItemsContext);

    // Shipping address
    const shippingAddress = Cookies.getJSON("shipping");

    // Create Order
    const [orderCreate] = useMutation(ORDER_CREATE);

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            // Create User's Order
            await orderCreate({
                variables: {
                    orderItems: cartContext.cartItems.map(cartItem => {
                        return {
                            product: cartItem.id,
                            quantity: Number(cartItem.countInStock)
                        }
                    }),
                    address: shippingAddress.address,
                    city: shippingAddress.city,
                    postalCode: shippingAddress.postal,
                    country: shippingAddress.country,
                    paymentMethod: "Paypal",
                    totalPrice: cartContext.cartItems.reduce((a ,b) => {
                        return Number(b.price) * Number(b.countInStock) + a; 
                    }, 0)
                },
                update: async (cache, { data: { createOrder } }) => {
                    const existingOrders = await cache.readQuery({
                        query: ORDERS
                    });

                    cache.evict({
                        fieldName: "notifications",
                        broadcast: false
                    });

                    const newOrder = createOrder;

                    cache.writeQuery({
                        query: ORDERS,
                        data: {
                            orders: [newOrder, ...existingOrders.orders]
                        },
                    });

                    setErrors("");

                    props.history.push({
                        pathname: `/checkout/${createOrder.id}`
                    });
                }
            });
        } catch (error) {
            setErrors(error.graphQLErrors[0].extensions.errors);
        
            return null;
        }
    };

    if(cartContext.cartItems.length === 0) {
        return <div style={{
            fontWeight: "bold",
            fontSize: "1.5rem",
            textAlign: "center"
        }}>Không có món hàng nào !!!!</div>
    }

    if(cartContext.cartItems){
        return (
            <div id="placeorder-container">
                <div className="cart">
                    <div className="shipping">
                        <h1>NƠI GIAO HÀNG</h1>
                        <div>Địa chỉ: 
                            {shippingAddress.address + " "} 
                            {shippingAddress.city + " "}
                            {shippingAddress.country + " "}
                        </div>
                    </div>
    
                    <div className="payment-method">
                        <h1>HÌNH THỨC THANH TOÁN</h1>
                        <div>Hình thức: Paypal</div>
                    </div>
    
                    <div className="cart-title">
                        <h1>GIỎ HÀNG</h1>
                    </div>

                    {
                        errors &&
                            <div style={{
                                marginTop: "20px",
                                fontSize: "1.2rem"
                            }}
                            className="checkout-state warning">
                                { errors.quantity }
                            </div>
                    }
    
                    {   
                        cartContext.cartItems &&
                        cartContext.cartItems.map((cartItem) => {
                            return <CartProducts key={cartItem.id} cartItem={cartItem} inputs={false}/>
                        })
                    }
                </div>
    
                <div className="cart-checkout">
                    <div className="add-product">
                        <form onSubmit={onSubmit}>
                            <table>
                                <thead>
                                    <tr>
                                        <td><h1>ĐƠN HÀNG</h1></td>
                                    </tr>
                                </thead>
    
                                <tbody>
                                    <tr>
                                        <td>
                                            <h1>Lượng hàng: </h1>
                                            <h1>
                                                {
                                                    cartContext.cartItems.reduce((a ,b) => {
                                                        return Number(b.countInStock) + a; 
                                                    }, 0)
                                                }
                                            </h1>
                                        </td>
                                    </tr>
    
                                    <tr>
                                        <td>
                                            <h1>Tổng cộng: </h1>
                                            <h1>
                                                $ 
                                                {
                                                    cartContext.cartItems.reduce((a ,b) => {
                                                        return Number(b.price) * Number(b.countInStock) + a; 
                                                    }, 0)
                                                }
                                            </h1>
                                        </td>
                                    </tr>
    
                                    <tr>
                                        <td>
                                            <button>
                                                ĐẶT HÀNG
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default PlaceOrder
