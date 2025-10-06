// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// export const getSneakers = createAsyncThunk(
//     "sneakers/fetch",
//     async (_, { rejectWithValue }) => {
//         try {
//             const res = await axios.get(`https://68ae8d7bb91dfcdd62b97a50.mockapi.io/sneakers`)
//             console.log(res.data);
//             return res.data
//         } catch (error) {
//             return rejectWithValue(error.message || "not found")
//         }
//     }
// )

// const sneakersSlice = createSlice({
//     name: "sneakers",
//     initialState: {
//         list: [],
//         loading: false,
//         error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(getSneakers.pending, (state) => {
//                 state.loading = true;
//                 state.error = null
//             })
//             .addCase(getSneakers.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.list = action.payload
//             })
//             .addCase(getSneakers.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload
//             })
//     }
// })
// export default sneakersSlice.reducer



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../axios/apiClient";

// Асинхронный thunk для загрузки кроссовок с фильтром gender: "middle"
export const getSneakers = createAsyncThunk(
  "sneakers/getSneakers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/kicks", {
        params: { gender: "middle" },
      });

      // Группировка по бренду
      const grouped = response.data.reduce((acc, item) => {
        if (!acc[item.brand]) acc[item.brand] = [];
        acc[item.brand].push(item);
        return acc;
      }, {});

      return grouped;
    } catch (error) {
      console.error("❌ Ошибка при загрузке /kicks:", error);
      return rejectWithValue(error.message || "Ошибка загрузки");
    }
  }
);

const sneakersSlice = createSlice({
  name: "sneakers",
  initialState: {
    list: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSneakers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSneakers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getSneakers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default sneakersSlice.reducer;