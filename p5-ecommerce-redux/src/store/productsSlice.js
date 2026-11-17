import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchProducts } from '../services/api'

export const loadProducts = createAsyncThunk('products/load', fetchProducts)

const productsSlice = createSlice({
  name: 'products',
  initialState: { items: [], status: 'idle', error: null, search: '', category: 'all', sort: 'none' },
  reducers: {
    setSearch: (s, a) => { s.search = a.payload },
    setCategory: (s, a) => { s.category = a.payload },
    setSort: (s, a) => { s.sort = a.payload },
  },
  extraReducers: (b) => {
    b.addCase(loadProducts.pending, (s) => { s.status = 'loading'; s.error = null })
     .addCase(loadProducts.fulfilled, (s, a) => { s.status = 'done'; s.items = a.payload })
     .addCase(loadProducts.rejected, (s, a) => { s.status = 'error'; s.error = a.error.message })
  },
})

export const { setSearch, setCategory, setSort } = productsSlice.actions
export default productsSlice.reducer

// Selectors
export const selectCategories = (st) => ['all', ...new Set(st.products.items.map((p) => p.category))]
export const selectVisibleProducts = (st) => {
  const { items, search, category, sort } = st.products
  let list = items.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()) && (category === 'all' || p.category === category))
  if (sort === 'low') list = [...list].sort((a, b) => a.price - b.price)
  if (sort === 'high') list = [...list].sort((a, b) => b.price - a.price)
  return list
}
