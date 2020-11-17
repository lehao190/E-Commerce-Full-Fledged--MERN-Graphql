import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import CartProducts from '../components/CartProducts';
import { cartItemsContext } from '../context/cartItemsContext';

function ProductCart() {
    // Context api
    const cartContext = useContext(cartItemsContext);

    if(cartContext.cartItems.length === 0) {
        return <div style={{
            fontWeight: "bold",
            fontSize: "1.5rem",
            textAlign: "center"
        }}>Không có món hàng nào !!!!</div>
    }

    if(cartContext.cartItems){
        return (
            <div id="cart-container">
                <div className="cart">
                    <div className="cart-title">
                        <h1>GIỎ HÀNG</h1>
                    </div>
                    {   
                        cartContext.cartItems &&
                        cartContext.cartItems.map((cartItem) => {
                            return <CartProducts key={cartItem.id} cartItem={cartItem} inputs={true}/>
                        })
                    }
                </div>
                
                <div className="cart-checkout">
                    <table>
                        <thead>
                            <tr>
                                <td><h1>TỔNG ({
                                        cartContext.cartItems.reduce((a ,b) => {
                                            return Number(b.countInStock) + a; 
                                        }, 0)
                                    }) MÓN</h1></td>
                            </tr>
                            <tr>
                                <td><h1>$ {
                                    cartContext.cartItems.reduce((a ,b) => {
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
