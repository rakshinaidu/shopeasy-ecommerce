import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    enqueueSnackbar("Logged out successfully", { variant: "info" });
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">ShopEasy</Link>
      <div className="ms-auto d-flex align-items-center gap-3">
        {user ? (
          <>
            <span className="text-light d-none d-sm-inline">Hi, {user.name}</span>
            <Link className="btn btn-outline-light btn-sm" to="/cart">
              Cart ({count})
            </Link>
            <button className="btn btn-danger btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="btn btn-outline-light btn-sm" to="/login">Login</Link>
            <Link className="btn btn-primary btn-sm" to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}