import React, { useState } from "react";
import api from "../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();

  const submit = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      if (!res.data.success) return toast.error(res.data.message || "Login failed");
      login(res.data.token);
      toast.success("Logged in");
      nav("/dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login error");
    }
  };

  return (
    <div className="card" style={{ maxWidth: 480, margin: "40px auto" }}>
      <h2>Login</h2>
      <div style={{ display: "grid", gap: 8 }}>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} type="password" />
        <button onClick={submit}>Login</button>
      </div>
    </div>
  );
}
