import React from 'react';
import { starRating } from "../utils/starRating";

// Reviews From Users On Particular Product
function UserReviews({ userComment }) {
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
