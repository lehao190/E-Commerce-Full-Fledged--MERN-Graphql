import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import CartProducts from '../components/CartProducts';
import Cookies from "js-cookie";

function ProductCart() {
    const cartItems = Cookies.getJSON("cartItems");

    useEffect(() => {
        console.log(cartItems);
    }, [cartItems]);

    if(!cartItems) {
        return !cartItems && <div>Không có món hàng nào !!!!</div>
    }

    if(cartItems){
        return (
            <div id="cart-container">
                <div className="cart">
                    <div className="cart-title">
                        <h1>GIỎ HÀNG</h1>
                    </div>
                    {   
                        cartItems &&
                        cartItems.map((cartItem) => {
                            return <CartProducts key={cartItem.id} cartItem={cartItem}/>
                        })
                    }
                </div>
                
                <div className="cart-checkout">
                    <table>
                        <thead>
                            <tr>
                                <td><h1>TỔNG ({
                                        cartItems.reduce((a ,b) => {
                                            return Number(b.countInStock) + a; 
                                        }, 0)
                                    }) MÓN</h1></td>
                            </tr>
                            <tr>
                                <td><h1>$ {
                                    cartItems.reduce((a ,b) => {
                                        return Number(b.price) * Number(b.countInStock) + a; 
                                    }, 0)}
                                </h1></td>
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
}

export default ProductCart
