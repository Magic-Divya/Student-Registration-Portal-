import React, { useEffect, useState } from "react";
import api from "../api/api";
import { toast } from "react-toastify";
import StudentForm from "../components/StudentForm";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = async () => {
    try {
      const res = await api.get("/students");
      setStudents(res.data.students || res.data);
    } catch (err) {
      toast.error("Failed to load students");
    }
  };

  useEffect(() => { load(); }, []);

  const add = async (data) => {
    try {
      await api.post("/students/add", data);
      toast.success("Student added");
      setShowForm(false);
      load();
    } catch (err) { toast.error("Add failed"); }
  };

  const update = async (data) => {
    try {
      await api.put(`/students/${editing._id}`, data);
      toast.success("Updated");
      setEditing(null);
      setShowForm(false);
      load();
    } catch (err) { toast.error("Update failed"); }
  };

  const remove = async (id) => {
    if (!confirm("Delete student?")) return;
    try {
      await api.delete(`/students/${id}`);
      toast.success("Deleted");
      load();
    } catch (err) { toast.error("Delete failed"); }
  };

  const filtered = students.filter(s => {
    if (!q) return true;
    const qq = q.toLowerCase();
    return (s.firstName || "").toLowerCase().includes(qq) || (s.lastName || "").toLowerCase().includes(qq) || (s.email || "").toLowerCase().includes(qq) || (s.usn || "").toLowerCase().includes(qq);
  });

  return (
    <div className="card">
      <h2>Students</h2>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input placeholder="Search by name, email, USN" value={q} onChange={e => setQ(e.target.value)} />
        <button onClick={() => { setEditing(null); setShowForm(true); }}>Add Student</button>
      </div>

      {showForm && (
        <div style={{ marginBottom: 12 }}>
          <StudentForm initial={editing || {}} onSave={editing ? update : add} onCancel={() => { setShowForm(false); setEditing(null); }} />
        </div>
      )}

      <div style={{ display: "grid", gap: 8 }}>
        {filtered.map(s => (
          <div key={s._id} style={{ padding: 12, borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 700 }}>{s.firstName} {s.lastName} <span style={{ fontWeight: 400 }}>({s.usn})</span></div>
              <div style={{ color: "#555" }}>{s.email} • {s.course}</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => { setEditing(s); setShowForm(true); }}>Edit</button>
              <button onClick={() => remove(s._id)} style={{ background: "#ffdddd" }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
