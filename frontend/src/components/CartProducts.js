import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";

function CartProducts({ cartItem: { id, name, price, countInStock, image, brand, category, description } }) {
    const [itemcount, setItemCount] = useState(countInStock);
    
    useEffect(() => {
        const cartItems = Cookies.getJSON("cartItems");

        if(cartItems) {
            const existingItems = cartItems.filter(cartItem => {
                return cartItem.id !== id
            });

            Cookies.set("cartItems", [
                ...existingItems,
                {
                    brand,
                    category,
                    countInStock: itemcount,
                    description,
                    id,
                    image,
                    name,
                    price,
                }
            ]);
        }
    }, [itemcount, id, brand, category, description, image, name, price]);

    return (
        <div className="cart-products">
            <div className="cart-product">
                <div className="cart-product-image">
                    <img src={`http://localhost:4000/public/images/${image}`} alt=""/>
                </div>

                <div className="cart-product-name">
                    <h1>
                       {name}
                    </h1>
                </div>

                <div className="cart-product-price">
                    <h1>${price}</h1>
                </div>

                <div className="cart-product-qty">
                    <input type="number" min="0" value={itemcount} onChange={ e => setItemCount(e.target.value) }/>
                </div>

                <div className="cart-product-delete">
                    <i className="fas fa-trash"></i>
                </div>
            </div>
        </div>
    )
}

export default CartProducts
