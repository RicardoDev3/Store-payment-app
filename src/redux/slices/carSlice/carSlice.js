import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  car: [],
  total: 0,
};

const carSlice = createSlice({
    name: 'carshop',
    initialState,
    reducers: {
        addToCar: (state, action) => {
            const product = action.payload;
            const existProduct = state.car.find((item) => item.name === product.name);

            if (existProduct) {
                existProduct.quantity += 1;
            } else {
                state.car.push({...product, quantity: 1});
            }

            state.total += product.price;
        },
        removeFromCar: (state, action) => {
            const productName = action.payload;
            const product = state.car.find((item) => item.name === productName);

            if (product) {
                state.total -= product.price * product.quantity;
                state.car = state.car.filter((item) => item.name !== productName);
            }
        },
        clearCar: (state) => {
            state.car = [];
            state.total = 0;
        }
    }
})

export const { addToCar, removeFromCar, clearCar} = carSlice.actions;
export default carSlice.reducer;
