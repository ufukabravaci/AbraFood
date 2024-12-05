import { createSlice } from "@reduxjs/toolkit";
import { shoppingCartModel } from "../../Interfaces";

const initialState : shoppingCartModel = {
    cartItems: [],
};

export const shoppingCartSlice = createSlice({
    name: "cartItems",
    initialState: initialState,
    reducers: {
        setShoppingCart: (state, action) =>{
            state.cartItems = action.payload;
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            state.cartItems = state.cartItems?.map((item) => {
                if (item.id === id) {
                    item.quantity = quantity;
                }
                return item;
            });
        },        
        removeFromCart: (state,action) => {
            state.cartItems =state.cartItems?.filter(
                (item) => item.id !== action.payload
            );
        },
    }
})

export const {setShoppingCart, updateQuantity,removeFromCart} = shoppingCartSlice.actions;
export const setShoppingCartReducer = shoppingCartSlice.reducer;