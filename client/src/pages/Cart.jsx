import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, removeFromCart, clearCart, total } = useCart();
  const { enqueueSnackbar } = useSnackbar();

  if (items.length === 0)
    return (
      <div className="text-center">
        <h3>Your cart is empty</h3>
        <Link to="/" className="btn btn-primary mt-2">Continue shopping</Link>
      </div>
    );

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Your Cart</h2>
        <button
          className="btn btn-outline-danger"
          onClick={() => {
            clearCart();
            enqueueSnackbar("Cart cleared", { variant: "info" });
          }}
        >
          Clear All
        </button>
      </div>
      <ul className="list-group mb-3">
        {items.map((i) => (
          <li key={i._id} className="list-group-item d-flex align-items-center gap-3">
            <img src={i.image} alt={i.title} style={{ width: 80, height: 60, objectFit: "cover" }} className="rounded" />
            <div className="flex-grow-1">
              <div className="fw-bold">{i.title}</div>
              <small className="text-muted">₹{i.price} × {i.qty}</small>
            </div>
            <div className="fw-bold">₹{i.price * i.qty}</div>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => {
                removeFromCart(i._id);
                enqueueSnackbar("Item removed", { variant: "info" });
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <h4 className="text-end">Total: ₹{total}</h4>
    </>
  );
}