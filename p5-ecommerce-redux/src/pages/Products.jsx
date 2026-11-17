import { useDispatch, useSelector } from 'react-redux'
import { selectCategories, selectVisibleProducts, setCategory, setSearch, setSort } from '../store/productsSlice'
import ProductCard from '../components/ProductCard'
import Status from '../components/Status'

export default function Products() {
  const dispatch = useDispatch()
  const { status, error, search, category, sort } = useSelector((s) => s.products)
  const products = useSelector(selectVisibleProducts)
  const categories = useSelector(selectCategories)

  return (
    <>
      <div className="filters">
        <input placeholder="Search by name" value={search} onChange={(e) => dispatch(setSearch(e.target.value))} />
        <select value={category} onChange={(e) => dispatch(setCategory(e.target.value))}>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={sort} onChange={(e) => dispatch(setSort(e.target.value))}>
          <option value="none">Sort by price</option><option value="low">Low to high</option><option value="high">High to low</option>
        </select>
      </div>
      <Status status={status} error={error} />
      {status === 'done' && products.length === 0 && <p className="center">No products match your search.</p>}
      <div className="grid">{products.map((p) => <ProductCard key={p.id} product={p} />)}</div>
    </>
  )
}
