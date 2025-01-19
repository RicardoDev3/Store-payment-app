import { configureStore } from "@reduxjs/toolkit";
import carReducer from "./slices/carSlice/carSlice";

export const store = configureStore({
    reducer: {
        car: carReducer
    }
})