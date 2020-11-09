import React from 'react';
import CartProducts from '../components/CartProducts';


function PlaceOrder() {
    return (
        <div id="placeorder-container">
            <div className="cart">
                <div className="shipping">
                    <h1>NƠI GIAO HÀNG</h1>
                    <div>Địa chỉ: 407/11b, Unknown Street, TP.HCM</div>
                </div>

                <div className="payment-method">
                    <h1>HÌNH THỨC THANH TOÁN</h1>
                    <div>Hình thức: Paypal</div>
                </div>

                <div className="cart-title">
                    <h1>GIỎ HÀNG</h1>
                </div>

                <CartProducts/>
                <CartProducts/>
                <CartProducts/>
                <CartProducts/>
                <CartProducts/>
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

export default PlaceOrder
