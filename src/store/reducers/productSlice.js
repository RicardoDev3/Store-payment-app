import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../actions/generalAction";

const initialState = {
  products: [],
  status: "",
  error: null,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
  reducers: {
    onRestartInitialState: (state) => {
        state.products = [];
        state.status = '';
        state.error = null;
    }
  }
});

export const { onRestartInitialState } = productSlice.actions
