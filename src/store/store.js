import { configureStore } from "@reduxjs/toolkit";
import carReducer from "./reducers/carSlice";
import { productSlice } from "./reducers/productSlice";

export const store = configureStore({
    reducer: {
        car: carReducer,
        products: productSlice.reducer
    }
})