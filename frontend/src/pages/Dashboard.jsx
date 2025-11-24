import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function Dashboard() {
  const [stats, setStats] = useState({ students: 0, courses: 0 });

  useEffect(() => {
    (async () => {
      try {
        const s = await api.get("/students");
        const c = await api.get("/courses");
        setStats({ students: s.data.students?.length || s.data.length || 0, courses: c.data.course?.length || c.data.length || 0 });
      } catch (err) {
        // ignore
      }
    })();
  }, []);

  return (
    <div className="card">
      <h2>Dashboard</h2>
      <div style={{ display: "flex", gap: 12 }}>
        <div style={{ padding: 12, background: "#fff", borderRadius: 8 }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{stats.students}</div>
          <div>Students</div>
        </div>
        <div style={{ padding: 12, background: "#fff", borderRadius: 8 }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{stats.courses}</div>
          <div>Courses</div>
        </div>
      </div>
    </div>
  );
}
