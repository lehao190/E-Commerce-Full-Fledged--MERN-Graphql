import React, { useEffect, useContext } from 'react';
import CartProducts from '../components/CartProducts';
import Paypal from "../components/paypal";
import { cartItemsContext } from '../context/cartItemsContext';
import Cookies from "js-cookie";

function CheckOut(props) {
    const isLoggedIn = Cookies.getJSON("isLoggedIn");

    useEffect(() => {
        if(!isLoggedIn.state) props.history.push({
            pathname: "/login"
        });
    }, [isLoggedIn.state, props.history]);

    const cartContext = useContext(cartItemsContext);

    // const shippingAddress = Cookies.getJSON("shipping");

    if(cartContext.cartItems.length === 0) {
        return <div style={{
            fontWeight: "bold",
            fontSize: "1.5rem",
            textAlign: "center"
        }}>Không có món hàng nào !!!!</div>
    }

    if(cartContext.cartItems)
    return (
        <div id="placeorder-container">
            <div className="cart">
                <div className="shipping">
                    <h1>NƠI GIAO HÀNG</h1>
                    <div>Người nhận: John Doe</div>
                    <div>Email: john@yahoo.com</div>
                    <div>Địa chỉ: 407/11b, Unknown Street, TP.HCM</div>
                    <div className="checkout-state warning">
                        Chưa giao hàng !
                    </div>
                </div>

                <div className="payment-method">
                    <h1>HÌNH THỨC THANH TOÁN</h1>
                    <div>Hình thức: Paypal</div>
                    <div className="checkout-state success">
                        Đã giao hàng vào: 19/11/2020
                    </div>
                </div>

                <div className="cart-title">
                    <h1>GIỎ HÀNG</h1>
                </div>

                {   
                        cartContext.cartItems &&
                        cartContext.cartItems.map((cartItem) => {
                            return <CartProducts key={cartItem.id} cartItem={cartItem} inputs={false}/>
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
                                        <h1>4</h1>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <h1>Tổng cộng: </h1>
                                        <h1>$ 280</h1>
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

export default CheckOut
