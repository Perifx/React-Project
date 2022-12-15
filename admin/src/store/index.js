import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./reducers/productSlice";
import { userReducer } from "./reducers/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
  },
});
