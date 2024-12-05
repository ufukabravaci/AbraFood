import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { menuItemReducer } from "./menuItemSlice";
import { menuItemApi, shoppingCartApi } from "../../Apis";
import { setShoppingCartReducer } from "./shoppingCartSlice";


const store = configureStore({
    reducer:{
        menuItemStore: menuItemReducer,
        shoppingCartStore: setShoppingCartReducer,
        [menuItemApi.reducerPath] : menuItemApi.reducer,
        [shoppingCartApi.reducerPath]: shoppingCartApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(menuItemApi.middleware)
    .concat(shoppingCartApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
