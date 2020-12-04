import React from 'react';
import { starRating } from "../utils/starRating";
import moment from "moment";

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
                {moment(userComment.createdAt, "x").format("DD / MMMM / YYYY")}
            </div>

            <div>
               { userComment.userComment }
            </div>
        </div>
    )
}

export default UserReviews
