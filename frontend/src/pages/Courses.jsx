import React, { useEffect, useState } from "react";
import api from "../api/api";
import { toast } from "react-toastify";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ name: "" });

  const load = async () => {
    try {
      const res = await api.get("/courses");
      setCourses(res.data.course || res.data);
    } catch (err) { toast.error("Failed to load"); }
  };

  useEffect(() => { load(); }, []);

  const submit = async () => {
    try {
      await api.post("/courses/add", form);
      toast.success("Course added");
      setForm({ name: "" });
      load();
    } catch (err) { toast.error("Add failed"); }
  };

  return (
    <div className="card">
      <h2>Courses</h2>
      <div style={{ display: "grid", gap: 8, maxWidth: 600 }}>
        <input placeholder="Course name" value={form.name} onChange={e => setForm({ name: e.target.value })} />
        <button onClick={submit}>Add Course</button>
      </div>

      <hr style={{ margin: "12px 0" }} />
      <div>
        {courses.map(c => (
          <div key={c._id} style={{ padding: 8, borderBottom: "1px solid #eee" }}>{c.name}</div>
        ))}
      </div>
    </div>
  );
}
