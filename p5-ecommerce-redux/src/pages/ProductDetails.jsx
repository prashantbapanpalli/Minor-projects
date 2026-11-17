import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchProduct } from '../services/api'
import { addToCart } from '../store/cartSlice'

export default function ProductDetails() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [product, setProduct] = useState(null)
  const [error, setError] = useState('')
  const [img, setImg] = useState('')

  useEffect(() => {
    setProduct(null); setError('')
    fetchProduct(id).then((p) => { setProduct(p); setImg(p.images?.[0] || p.thumbnail) }).catch((e) => setError(e.message))
  }, [id])

  if (error) return <p className="center error">{error}</p>
  if (!product) return <p className="center">Loading...</p>

  return (
    <div className="details">
      <div>
        <img className="big" src={img} alt={product.title} />
        <div className="thumbs">
          {product.images?.map((src) => <img key={src} src={src} alt="" onClick={() => setImg(src)} className={src === img ? 'sel' : ''} />)}
        </div>
      </div>
      <div>
        <h1>{product.title}</h1>
        <p className="muted">{product.category} | Rating {product.rating}</p>
        <p>{product.description}</p>
        <p className="price">${product.price} <small>({product.discountPercentage}% off)</small></p>
        <button onClick={() => dispatch(addToCart(product))}>Add to cart</button>
        <p><Link to="/products">Back to products</Link></p>
      </div>
    </div>
  )
}
