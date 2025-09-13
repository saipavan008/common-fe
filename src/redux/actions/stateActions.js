import {SET_CART, SET_USER_DETAILS, UPDATE_CART} from "./index";

export const setUserDetails = (payload) => ({
    type: SET_USER_DETAILS,
    payload
});

export const updateCart = (payload) => ({
    type: UPDATE_CART,
    payload
})

export const setCart = (payload) => ({
    type: SET_CART,
    payload
})