import { ADD_ITEM, REMOVE_ITEM } from "../actions/cartItemsActions";
import Cookies from "js-cookie";

const cartItemsReducer = (state, action) => {
    switch(action.type) {
        // Add Cart Items
        case ADD_ITEM:
            const existingItems = state.filter(cartItem => {
                return cartItem.id !== action.payload.id
            });

            Cookies.set("cartItems", [
                action.payload,
                ...existingItems
            ]);

            return [
                action.payload,
                ...existingItems
            ];

        // Remove Item from Cart
        case REMOVE_ITEM:
            const removeItem = state.filter(cartItem => {
                return cartItem.id !== action.payload.id
            });

            Cookies.set("cartItems", [
                ...removeItem
            ]);

            return [
                ...removeItem
            ]
        default:
            return state;
    }
}

export default cartItemsReducer;