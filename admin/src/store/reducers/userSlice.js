import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest, userRequest } from "./requestMethods";

const initialState = {
  users: [],
  userById: {},
  currentUser: null,
  isLoading: false,
  error: null,
};

export const getUser = createAsyncThunk(
  "user/getUser",
  async (user, { rejectWithValue }) => {
    try {
      const res = await publicRequest.post("/auth/login", user);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await userRequest.get(`/users/find/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUsersList = createAsyncThunk(
  "user/getUsersList",
  async (args, { rejectWithValue }) => {
    try {
      const res = await userRequest.get("/users");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const udpateUsers = createAsyncThunk(
  "user/udpateUsers",
  async ({ userId, user }, { rejectWithValue }) => {
    try {
      const res = await userRequest.put(`/users/${userId}`, user);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteUser = createAsyncThunk(
  "product/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const res = await userRequest.delete(`/users/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const createUser = createAsyncThunk(
  "product/createUser",
  async (user, { rejectWithValue }) => {
    try {
      const res = await userRequest.post(`/auth/register`, user);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [getUser.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [getUser.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
      state.error = action.payload;
      state.isLoading = false;
    },
    [getUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getUsersList.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [getUsersList.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.error = null;
      state.isLoading = false;
    },
    [getUsersList.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getUserById.fulfilled]: (state, action) => {
      state.userById = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    [getUserById.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteUser.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    [udpateUsers.pending]: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    [udpateUsers.fulfilled]: (state, action) => {
      state.userById = action.payload;
      state.error = null;
      state.isLoading = false;
    },
    [udpateUsers.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
