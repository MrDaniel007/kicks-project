import { configureStore } from "@reduxjs/toolkit";
// import categoryReducer from "./category/categorySlice"
import sneakersReducer from "./sneakers/sneakersSlice"
import kicksReducer from "./kicks/kicks"
import cartReducer from "./carts-1/cartSlice"
import likeReducer from "./likes/likeSlice"
// import productReducer from "./product/productSlice"
// import wishReducer from "./wish/wishSlice";
// import cartReducer from "./cartS/cartSlice"

export const myStore = configureStore({
    reducer: {
        sneakers: sneakersReducer,
        like: likeReducer,
        // product: productReducer,
        kicks: kicksReducer,
        cart: cartReducer,
        // buy: cartReducer
    }
})