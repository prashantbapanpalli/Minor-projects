import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './productsSlice'
import cartReducer from './cartSlice'

export const store = configureStore({ reducer: { products: productsReducer, cart: cartReducer } })

// Keep the cart after refresh
store.subscribe(() => localStorage.setItem('cart', JSON.stringify(store.getState().cart.items)))
