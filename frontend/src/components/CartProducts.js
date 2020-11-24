import React, { useState, useContext } from 'react';
import { cartItemsContext } from '../context/cartItemsContext';
import { ADD_ITEM, REMOVE_ITEM } from '../actions/cartItemsActions';

function CartProducts(
    { 
        cartItem,
        orderItem,
        inputs,
    }

    ) {
    
    const [itemcount, setItemCount] = useState(cartItem && cartItem.countInStock);
    
    const cartContext = useContext(cartItemsContext);

    const onClick = () => {
        cartContext.cartItemsDispatch({
            type: REMOVE_ITEM,
            payload: {
                id: cartItem.id
            }
        });
    };

    return (
        <div className="cart-products">
            <div className="cart-product">
                <div className="cart-product-image">
                    {   
                        cartItem &&
                        <img src={`http://localhost:4000/public/images/${cartItem.image}`} alt=""/>
                    }

                    {   
                        orderItem &&
                        <img src={`http://localhost:4000/public/images/${orderItem.product.image}`} alt=""/>
                    }
                </div>

                <div className="cart-product-name">
                    <h1>
                       { cartItem && cartItem.name}
                       {
                           orderItem &&
                           orderItem.product.name
                       }
                    </h1>
                </div>

                <div className="cart-product-price">
                    {   
                        cartItem &&
                        <h1>${cartItem.price} x {itemcount}</h1>
                    }
                    {
                        orderItem &&
                        <h1>${orderItem.product.price} x {orderItem.quantity}</h1>
                    }
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
                                    brand: cartItem.brand,
                                    category: cartItem.category,
                                    countInStock: e.target.value,
                                    description: cartItem.description,
                                    id: cartItem.id,
                                    image: cartItem.image,
                                    name: cartItem.name,
                                    price: cartItem.price
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
