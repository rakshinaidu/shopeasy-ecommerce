import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Home() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const { addToCart } = useCart();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/items")
      .then((res) => setItems(res.data))
      .catch(() => enqueueSnackbar("Failed to load items", { variant: "error" }))
      .finally(() => setLoading(false));
  }, []);

  const filtered = items.filter((i) => {
    const q = search.toLowerCase();
    return i.title.toLowerCase().includes(q) || i.seller.toLowerCase().includes(q);
  });

  const handleAdd = (item) => {
    if (!token) {
      enqueueSnackbar("Please log in to add items to your cart", { variant: "info" });
      navigate("/login");
      return;
    }
    addToCart(item);
    enqueueSnackbar(`${item.title} added to cart`, { variant: "success" });
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <>
      <input
        className="form-control mb-4"
        placeholder="Search by title or seller..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filtered.length === 0 && <p className="text-center">No items found.</p>}
      <div className="row g-4">
        {filtered.map((item) => (
          <div className="col-12 col-sm-6 col-lg-4" key={item._id}>
            <div className="card h-100 shadow-sm">
              <img
                src={item.image}
                className="card-img-top"
                alt={item.title}
                style={{ height: 220, width: "100%", objectFit: "cover" }}
              />              
                <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.title}</h5>
                <p className="mb-1 text-muted">Seller: {item.seller}</p>
                <p className="mb-1">Category: {item.category}</p>
                <p className="mb-1">Rating: {item.rating} ★</p>
                <p className="fw-bold fs-5">₹{item.price}</p>
                <div className="mt-3 d-flex gap-2">
                <Link to={`/details/${item._id}`} className="btn btn-outline-primary flex-fill">
                    View Details
                  </Link>
                  <button className="btn btn-success flex-fill" onClick={() => handleAdd(item)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}