import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProductCard from '../components/ProductCard'
import Status from '../components/Status'

export default function Home() {
  const { items, status, error } = useSelector((s) => s.products)
  const featured = [...items].sort((a, b) => b.rating - a.rating).slice(0, 4)
  return (
    <>
      <section className="hero">
        <h1>Shop the best deals</h1>
        <p>Thousands of products, one simple store.</p>
        <Link className="btn" to="/products">Browse products</Link>
      </section>
      <h2>Featured products</h2>
      <Status status={status} error={error} />
      <div className="grid">{featured.map((p) => <ProductCard key={p.id} product={p} />)}</div>
    </>
  )
}
