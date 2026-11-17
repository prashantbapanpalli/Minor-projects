import { createSlice } from '@reduxjs/toolkit'

const saved = (() => { try { return JSON.parse(localStorage.getItem('cart')) || [] } catch { return [] } })()

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: saved }, // each item: { id, title, price, thumbnail, qty }
  reducers: {
    addToCart: (s, { payload }) => {
      const found = s.items.find((i) => i.id === payload.id)
      if (found) found.qty += 1
      else s.items.push({ id: payload.id, title: payload.title, price: payload.price, thumbnail: payload.thumbnail, qty: 1 })
    },
    removeFromCart: (s, { payload: id }) => { s.items = s.items.filter((i) => i.id !== id) },
    increase: (s, { payload: id }) => { s.items.find((i) => i.id === id).qty += 1 },
    decrease: (s, { payload: id }) => {
      const item = s.items.find((i) => i.id === id)
      if (item.qty > 1) item.qty -= 1
      else s.items = s.items.filter((i) => i.id !== id)
    },
    clearCart: (s) => { s.items = [] },
  },
})

export const { addToCart, removeFromCart, increase, decrease, clearCart } = cartSlice.actions
export default cartSlice.reducer

export const selectTotalItems = (st) => st.cart.items.reduce((n, i) => n + i.qty, 0)
export const selectTotalPrice = (st) => st.cart.items.reduce((n, i) => n + i.qty * i.price, 0)
