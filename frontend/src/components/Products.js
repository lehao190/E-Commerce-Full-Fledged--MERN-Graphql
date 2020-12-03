import React from 'react';
import { Link } from "react-router-dom";

// All Products Upon Request
function Products({ product: { id, name, image, price, rating, numReviews } }) {
    const percent = (rating / 5) * 100;
    
    const style = {
        width: "50%",
        fontSize: "1.4rem",
        letterSpacing: "2px",
        background: `linear-gradient(90deg, yellow ${percent}%, gray 0%)`,
        WebkitBackgroundClip: "text",
        color: "transparent",
    };

    return (
        <div className="product-card">
            <Link to={`/products/${id}`}>
                <div className="product-image">
                    <img src={`http://localhost:4000/public/images/${image}`} alt="" />
                </div>
                    
                <div className="product-name">
                    {name}
                </div>

                <div className="product-ratings">
                    <div className="stars" 
                    style={style}>
                        ★★★★★
                    </div>
                    <div>{ numReviews } Đánh Giá</div>
                </div>

                <div className="product-price">
                    ${price}
                </div>
            </Link>
        </div>
    )
}

export default Products
