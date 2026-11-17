import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/cartSlice'

export default function ProductCard({ product }) {
  const dispatch = useDispatch()
  return (
    <div className="card">
      <Link to={`/products/${product.id}`}>
        <img src={product.thumbnail} alt={product.title} loading="lazy" />
        <h3>{product.title}</h3>
      </Link>
      <p className="muted">{product.category}</p>
      <p>Rating: {product.rating}</p>
      <p className="price">${product.price}</p>
      <button onClick={() => dispatch(addToCart(product))}>Add to cart</button>
    </div>
  )
}
