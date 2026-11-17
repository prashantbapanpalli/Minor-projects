import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loadProducts } from './store/productsSlice'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'

export default function App() {
  const dispatch = useDispatch()
  useEffect(() => { dispatch(loadProducts()) }, [dispatch])
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<p className="center">Page not found</p>} />
        </Routes>
      </main>
      <footer>Minor Project 05 - B Prashant</footer>
    </>
  )
}
