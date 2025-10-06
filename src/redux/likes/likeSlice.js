import { createSlice } from "@reduxjs/toolkit";

const likeSlice = createSlice({
  name: "like",
  initialState: {
    items: [], // массив избранных товаров
  },
  reducers: {
    addToLike: (state, action) => {
      const item = action.payload;
      const exists = state.items.find(i => i.id === item.id);
      if (!exists) {
        state.items.push(item);
      }
    },
    removeFromLike: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(i => i.id !== id);
    },
    clearLikes: (state) => {
      state.items = [];
    }
  }
});

export const { addToLike, removeFromLike, clearLikes } = likeSlice.actions;
export default likeSlice.reducer;