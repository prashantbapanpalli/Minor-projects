// DummyJSON: free public product API (no key)
const BASE = 'https://dummyjson.com/products'

const get = async (url) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error('Could not load products. Please try again.')
  return res.json()
}
export const fetchProducts = () => get(`${BASE}?limit=100`).then((d) => d.products)
export const fetchProduct = (id) => get(`${BASE}/${id}`)
