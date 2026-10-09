import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import api from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      enqueueSnackbar("Password must be at least 6 characters", { variant: "warning" });
      return;
    }
    setLoading(true);
    try {
      await api.post("/auth/register", form);
      enqueueSnackbar("Registration successful! Please log in.", { variant: "success" });
      navigate("/login");
    } catch (err) {
      enqueueSnackbar(err.response?.data?.message || "Registration failed", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto" style={{ maxWidth: 420 }}>
      <h2 className="mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input name="name" className="form-control" value={form.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password (min 6 characters)</label>
          <input type="password" name="password" className="form-control" value={form.password} onChange={handleChange} minLength={6} required />
        </div>
        <button className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>
      <p className="mt-3 text-center">
        Already registered? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}