import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userRequest } from "../../store/reducers/requestMethods";

export const getProducts = createAsyncThunk(
  "product/getProduct",
  async (args, { rejectWithValue }) => {
    try {
      const res = await userRequest.get("/products/find");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const res = await userRequest.delete(`/products/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ productId, product }, { rejectWithValue }) => {
    try {
      const res = await userRequest.put(`/products/${productId}`, product);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (product, { rejectWithValue }) => {
    try {
      const res = await userRequest.post(`/products/new`, product);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getProductByID = createAsyncThunk(
  "product/getProductByID",
  async (id, { rejectWithValue }) => {
    try {
      const res = await userRequest.get(`/products/find/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  products: [],
  productById: {},
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: {
    [getProducts.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    [getProducts.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    [deleteProduct.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    [getProductByID.fulfilled]: (state, action) => {
      state.productById = action.payload;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const productReducer = productSlice.reducer;
export const productActions = productSlice.actions;
