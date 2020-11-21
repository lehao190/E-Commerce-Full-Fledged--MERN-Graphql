import React, { useState, useContext } from 'react';
import { cartItemsContext } from '../context/cartItemsContext';
import { ADD_ITEM, REMOVE_ITEM } from '../actions/cartItemsActions';

function CartProducts({ cartItem: { id, name, price, countInStock, image, brand, category, description }, inputs }) {
    const [itemcount, setItemCount] = useState(countInStock);
    
    const cartContext = useContext(cartItemsContext);

    const onClick = () => {
        cartContext.cartItemsDispatch({
            type: REMOVE_ITEM,
            payload: {
                id
            }
        });
    };

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
                    <h1>${price} x {itemcount}</h1>
                </div>

                {
                    inputs &&
                    <>
                    <div className="cart-product-qty">
                        <input type="number" min="0" value={itemcount} onChange={ e => {
                            setItemCount(e.target.value);
                    
                            cartContext.cartItemsDispatch({
                                type: ADD_ITEM,
                                payload: {
                                    brand,
                                    category,
                                    countInStock: e.target.value,
                                    description,
                                    id,
                                    image,
                                    name,
                                    price
                                }
                            });
                        } }/>
                    </div>

                    <div className="cart-product-delete">
                        <i onClick={onClick} className="fas fa-trash"></i>
                    </div>
                    </>
                }
            </div>
        </div>
    )
}

export default CartProducts
