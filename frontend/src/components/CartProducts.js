import React from 'react'

function CartProducts() {
    return (
        <div className="cart-products">
            <div className="cart-product">
                <div className="cart-product-image">
                    <img src="/logo192.png" alt=""/>
                </div>

                <div className="cart-product-name">
                    <h1>
                        Awesome Product is here mate !!! yololoasdasdsadasd
                        Awesome Product is here mate !!! yololo
                        Awesome Product is here mate !!! yololo
                    </h1>
                </div>

                <div className="cart-product-price">
                    <h1>$89.05</h1>
                </div>

                <div className="cart-product-qty">
                    <input type="number" min="0" />
                </div>

                <div className="cart-product-delete">
                    <i className="fas fa-trash"></i>
                </div>
            </div>
        </div>
    )
}

export default CartProducts
