import React from 'react';
import { Link } from "react-router-dom";
import CartProducts from '../components/CartProducts';

function ProductCart(props) {
    return (
        <div id="cart-container">
            <div className="cart">
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
                <table>
                    <thead>
                        <tr>
                            <td><h1>TỔNG (3) MÓN</h1></td>
                        </tr>
                        <tr>
                            <td><h1>$ 580</h1></td>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>
                                <button>
                                    <Link to="/shipping" style={{
                                            color: "white",
                                            width: "100%",
                                            display: "block"
                                        }}>
                                        TIẾP TỤC THANH TOÁN
                                    </Link>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProductCart
