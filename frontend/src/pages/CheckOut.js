import React, { useEffect } from 'react';
import CartProducts from '../components/CartProducts';
import Paypal from "../components/paypal";
import { useQuery } from "@apollo/client";
import Cookies from "js-cookie";
import { ORDER } from '../graphql/Queries/orderQueries';

function CheckOut(props) {
    const isLoggedIn = Cookies.getJSON("isLoggedIn");

    // Make Order Query
    const { loading, error, data } = useQuery(ORDER, {
        variables: {
            id: props.match.params.checkoutId
        }
    });

    // Check if user Logged-In
    useEffect(() => {
        if(!isLoggedIn.state) props.history.push({
            pathname: "/login"
        });
    }, [isLoggedIn.state, props.history]);

    if(!data) {
        return <div style={{
            fontWeight: "bold",
            fontSize: "1.5rem",
            textAlign: "center"
        }}>Không có món hàng nào !!!!</div>
    }

    if(loading) return <div>Đang tải...</div>

    if(error) return <div>Errors xảy ra...</div>

    if(data) {
        const { order } = data;

        return (
            <div id="placeorder-container">
                <div className="cart">
                    <div className="shipping">
                        <h1>NƠI GIAO HÀNG</h1>
                        <div>Người nhận: { order.user.username }</div>
                        <div>Email: { order.user.email }</div>
                        <div>
                            Địa chỉ: 
                            {" " + order.shipping.address + " "}
                            { order.shipping.city + " "}
                            { order.shipping.country + " "}
                        </div>
                        {
                            !order.isDelivered &&
                            <div className="checkout-state warning">
                                Chưa giao hàng !
                            </div>
                        }

                        {
                            order.isDelivered &&
                            <div className="checkout-state success">
                                Đã giao hàng !
                            </div>
                        }
                    </div>

                    <div className="payment-method">
                        <h1>HÌNH THỨC THANH TOÁN</h1>
                        <div>Hình thức: { order.payment.paymentMethod }</div>
                        {
                            order.isPaid &&
                            <div className="checkout-state success">
                                Đã giao hàng vào: 19/11/2020
                            </div>
                        }

                        {
                            !order.isPaid &&
                            <div className="checkout-state warning">
                                Chưa Trả Tiền !
                            </div>
                        }
                    </div>

                    <div className="cart-title">
                        <h1>GIỎ HÀNG</h1>
                    </div>

                    {   
                            order.orderItems &&
                            order.orderItems.map((orderItem) => {
                                return <CartProducts key={orderItem.product.id} orderItem={orderItem} inputs={false}/>
                            })
                    }
                </div>

                <div className="cart-checkout">
                    <div className="add-product">
                        <form>
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
                                                    order.orderItems.reduce((a ,b) => {
                                                        return Number(b.quantity) + a; 
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
                                                    order.orderItems.reduce((a ,b) => {
                                                        return Number(b.product.price) * Number(b.quantity) + a; 
                                                    }, 0)
                                                }
                                            </h1>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <div style={{
                                                width: "100%"
                                            }}>
                                                <Paypal/>
                                            </div>
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

export default CheckOut
