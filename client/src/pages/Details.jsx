import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Details() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const { addToCart } = useCart();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/items/${id}`)
      .then((res) => setItem(res.data))
      .catch(() => enqueueSnackbar("Item not found", { variant: "error" }))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAdd = () => {
    if (!token) {
      enqueueSnackbar("Please log in to add items to your cart", { variant: "info" });
      navigate("/login");
      return;
    }
    addToCart(item);
    enqueueSnackbar(`${item.title} added to cart`, { variant: "success" });
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (!item) return <p className="text-center">Item not found. <Link to="/">Back to home</Link></p>;

  return (
    <div className="row g-4">
      <div className="col-md-6">
        <img
          src={item.image}
          alt={item.title}
          className="rounded w-100"
          style={{ maxHeight: 420, objectFit: "contain", backgroundColor: "#f1f3f5" }}        />
      </div>
      <div className="col-md-6">
        <h2>{item.title}</h2>
        <p className="text-muted">Sold by {item.seller}</p>
        <p><strong>Category:</strong> {item.category}</p>
        <p><strong>Rating:</strong> {item.rating} ★</p>
        <p>{item.description}</p>
        <h3 className="mb-3">₹{item.price}</h3>
        <button className="btn btn-success me-2" onClick={handleAdd}>Add to Cart</button>
        <Link to="/" className="btn btn-outline-secondary">Back</Link>
      </div>
    </div>
  );
}