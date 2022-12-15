import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  amount: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.amount += action.payload.amount;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.amount;
    },
    cartLogOut: (state, action) => {
      state.products = [];
      state.amount = 0;
      state.total = 0;
    },
  },
  extraReducers: {},
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;
