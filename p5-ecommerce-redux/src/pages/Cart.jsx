import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, decrease, increase, removeFromCart, selectTotalItems, selectTotalPrice } from '../store/cartSlice'

export default function Cart() {
  const dispatch = useDispatch()
  const items = useSelector((s) => s.cart.items)
  const totalItems = useSelector(selectTotalItems)
  const totalPrice = useSelector(selectTotalPrice)

  if (!items.length) return <p className="center">Your cart is empty. <Link to="/products">Shop now</Link></p>

  return (
    <>
      <h1>Shopping Cart</h1>
      {items.map((i) => (
        <div className="cartrow" key={i.id}>
          <img src={i.thumbnail} alt={i.title} />
          <div className="grow"><b>{i.title}</b><br />${i.price}</div>
          <div className="qty">
            <button onClick={() => dispatch(decrease(i.id))}>-</button>
            <span>{i.qty}</span>
            <button onClick={() => dispatch(increase(i.id))}>+</button>
          </div>
          <b>${(i.price * i.qty).toFixed(2)}</b>
          <button className="danger" onClick={() => dispatch(removeFromCart(i.id))}>Remove</button>
        </div>
      ))}
      <div className="summary">
        <p>Total items: <b>{totalItems}</b></p>
        <p>Total price: <b>${totalPrice.toFixed(2)}</b></p>
        <button className="danger" onClick={() => dispatch(clearCart())}>Clear cart</button>
      </div>
    </>
  )
}
