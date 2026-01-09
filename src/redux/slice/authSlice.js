import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Retrive userInfo from localStorage
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

//check for an existing guest ID in the localstorage or generate a new one
const InitialGuestId =
  localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
localStorage.setItem("guestId", InitialGuestId);

// initial state
const initialState = {
  loading: false,
  userInfo: userInfoFromStorage,
  error: null,
  guestId: InitialGuestId,
  success: false,
};

//Async thunk for user login
export const loginUser = createAsyncThunk(
  "auth/userLogin",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        userData
      );
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      localStorage.setItem("userToken", response.data.token);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//Async thunk for user registration

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/register`,
        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


//slice

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user= null,
      state.guestId = `guest_${new Date().getTime()}`;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userToken");
      localStorage.setItem("guestId", state.guestId);
    },
    generateNewGuestId:(state)=>{
      state.guestId = `guest_${new Date().getTime()}`;
      localStorage.setItem("guestId", state.guestId);
    },
    extraReducers: (builder) => {
      builder
        .addCase(userLogin.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(userLogin.fulfilled, (state, action) => {
          state.loading = false;
          state.userInfo = action.payload;
          state.error = null;
        })
        .addCase(userLogin.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(registerUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.error = null;
        })
        .addCase(registerUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  },
  
});

export const { logout, generateNewGuestId } = authSlice.actions;
export default authSlice.reducer;