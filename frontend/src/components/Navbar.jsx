import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/");
  };

  return (
    <header style={{ background: "#0ea5a3", color: "white", padding: 12 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontWeight: 700 }}>Student Registration Portal</div>
        <nav style={{ display: "flex", gap: 12 }}>
          {token ? (
            <>
              <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>Dashboard</Link>
              <Link to="/students" style={{ color: "white", textDecoration: "none" }}>Students</Link>
              <Link to="/courses" style={{ color: "white", textDecoration: "none" }}>Courses</Link>
              <button onClick={handleLogout} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "white", padding: "6px 10px", borderRadius: 6 }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/" style={{ color: "white", textDecoration: "none" }}>Login</Link>
              <Link to="/register" style={{ color: "white", textDecoration: "none" }}>Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
