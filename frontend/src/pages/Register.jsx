import React, { useState } from "react";
import api from "../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const nav = useNavigate();

  const submit = async () => {
    try {
      const res = await api.post("/auth/signup", form);
      if (!res.data.success) return toast.error(res.data.message || "Register failed");
      toast.success("Registered, now login");
      nav("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Register error");
    }
  };

  return (
    <div className="card" style={{ maxWidth: 600, margin: "40px auto" }}>
      <h2>Register</h2>
      <div style={{ display: "grid", gap: 8 }}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        <button onClick={submit}>Register</button>
      </div>
    </div>
  );
}
