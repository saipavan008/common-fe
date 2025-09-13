import {SET_CART, SET_USER_DETAILS, UPDATE_CART} from "../actions";

const initialState = {
    data: {},
    cart: []
};

const stateReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DETAILS:
            return {
                ...state,
                data: action.payload
            };
        case SET_CART:
            return {
                ...state,
                cart: action.payload
            }
        case UPDATE_CART:
            const updated = action.payload;
            let newCart = state?.cart?.filter((item => item?._id !== updated?._id))
                .concat(updated?.is_added_to_cart ? [updated] : []);

            const totalCartValue = newCart?.reduce((acc, curr) => acc + (curr.price || 0), 0)
            newCart?.map(item => ({...item, total_cart_amount: totalCartValue}))

            return {
                ...state,
                cart: newCart
            };
        default:
            return state;
    }
};

export default stateReducer;