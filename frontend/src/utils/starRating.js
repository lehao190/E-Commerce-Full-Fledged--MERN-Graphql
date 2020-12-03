import React from "react";

// Count Star
export const starRating = (rating) => {
    let stars = [];

    for(let i = 1; i <= 5; i++) {
        if(rating >= i) {
            stars.push(<span key={i}>★</span>);
        }
        else { 
            stars.push(<span key={i}
                style={{
                    color: "gray"
                }}
            >★</span>);
        }
    }

    return stars;
};