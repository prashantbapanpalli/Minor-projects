import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setSearch } from '../store/productsSlice'
import { selectTotalItems } from '../store/cartSlice'

export default function Navbar() {
  const [q, setQ] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const count = useSelector(selectTotalItems)

  const submit = (e) => { e.preventDefault(); dispatch(setSearch(q)); navigate('/products') }

  return (
    <nav className="nav">
      <Link to="/" className="logo">ShopEasy</Link>
      <form onSubmit={submit} className="searchbar">
        <input placeholder="Search products" value={q} onChange={(e) => setQ(e.target.value)} />
        <button>Search</button>
      </form>
      <div className="links">
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart ({count})</Link>
      </div>
    </nav>
  )
}
