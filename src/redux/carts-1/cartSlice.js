import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { 
    list: [], // текущая корзина
    orders: [] // история заказов
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const exists = state.list.find(i => i.id === item.id);
      if (exists) {
        exists.quantity += 1;
      } else {
        state.list.push({ ...item, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.list = state.list.filter(i => i.id !== action.payload);
    },
    updateQuantityInCart: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.list.find(i => i.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart: (state) => { 
      state.list = []; 
    },
    // Новый редюсер для сохранения заказа
    saveOrder: (state, action) => {
      const order = {
        id: Date.now(), // уникальный ID заказа
        date: new Date().toISOString(),
        items: [...state.list], // копируем товары из корзины
        total: action.payload.total, // общая сумма
        delivery: action.payload.delivery,
        finalTotal: action.payload.finalTotal
      };
      state.orders.push(order);
      state.list = []; // очищаем корзину после заказа
    }
  }
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantityInCart, 
  clearCart,
  saveOrder 
} = cartSlice.actions;
export default cartSlice.reducer;