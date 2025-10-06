
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk для загрузки кроссовок с MockAPI
export const getKicks = createAsyncThunk(
  "kicks/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("https://68ae8d7bb91dfcdd62b97a50.mockapi.io/kicks");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message || "Not found");
    }
  }
);

const kicksSlice = createSlice({
  name: "kicks",
  initialState: {
    list: [],
    favorites: [],
    loading: false,
    error: null,
  },
  reducers: {
    // если захочешь локально добавлять в избранное
  addToFavorite: (state, action) => {
  const item = action.payload;
  const exists = state.favorites.find(i => i.id === item.id);
  if (!exists) {
    state.favorites.push(item);
  }
},
removeFromFavorite: (state, action) => {
  const id = action.payload;
  state.favorites = state.favorites.filter(i => i.id !== id);
}
  },
  extraReducers: (builder) => {
    builder
      .addCase(getKicks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getKicks.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getKicks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// экспортируем actions и reducer
export const { addToFavorite, removeFromFavorite } = kicksSlice.actions;
export default kicksSlice.reducer;