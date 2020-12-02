import React from 'react';

// Reviews From Users On Particular Product
function UserReviews({ userComment }) {

    // Count Star
    const starRating = (rating) => {
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

    return (
        <div className="user-review-container">
            <div>
                { userComment.username }
            </div>

            <div>
                {
                    starRating(userComment.userRating)
                }
            </div>

            <div>
                {/* 19/11/2020 */}
                { userComment.createdAt }
            </div>

            <div>
               { userComment.userComment }
            </div>
        </div>
    )
}

export default UserReviews
