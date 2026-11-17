# E-commerce Frontend with Redux Toolkit
Minor Project 05 - by B Prashant.

## Overview
A responsive shopping site built with React and Redux Toolkit. Products come from the free DummyJSON API.

## Features
- Home page with hero, featured products, navbar and search bar
- Product listing grid (image, name, price, category, rating)
- Product details page with image gallery, description and Add to Cart
- Cart: add, remove, increase/decrease quantity, total items and total price (saved after refresh)
- Search by name, filter by category, sort by price
- Loading and error states, mobile / tablet / desktop layout

## State management (Redux Toolkit)
- `store/store.js` - store configuration
- `store/productsSlice.js` - product data, search/category/sort, `createAsyncThunk`, selectors
- `store/cartSlice.js` - cart actions/reducers, totals via selectors
Components use `useDispatch` and `useSelector`.

## Technologies
React 19, Redux Toolkit, React Redux, React Router, Vite, DummyJSON API, CSS3.

## Folder structure
`src/components`, `src/pages`, `src/store`, `src/services`, `App.jsx`, `main.jsx`

## Setup
```
npm install
npm run dev     # http://localhost:5173
```
