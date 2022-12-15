import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { publicRequest } from "../../requestMethods";

export const login = createAsyncThunk(
  "user/login",
  async (user, { rejectWithValue }) => {
    try {
      const res = await publicRequest.post("/auth/login", user);
      console.log(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const register = createAsyncThunk(
  "user/register",
  async (user, { rejectWithValue }) => {
    try {
      const res = await publicRequest.post("/auth/register", user);
      console.log(res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state, action) => {
      state.currentUser = null;
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [login.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    [login.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    [register.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [register.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    [register.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
