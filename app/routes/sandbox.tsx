import React, { useState } from "react";

const SandboxPage = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", textAlign: "center" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        Testing State Re-render
      </h1>
      <p style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
        Current Count: <strong style={{ color: "#f97316" }}>{count}</strong>
      </p>
      <button
        onClick={increment}
        style={{
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          color: "white",
          backgroundColor: "#1e293b",
          border: "none",
          borderRadius: "0.5rem",
          cursor: "pointer",
        }}
      >
        Increment Count
      </button>
      <p style={{ marginTop: "2rem", color: "#64748b", fontSize: "0.9rem" }}>
        Jika angka di atas bertambah saat Anda mengklik tombol, berarti re-render berfungsi dengan benar.
        <br />
        Periksa juga konsol developer di browser Anda untuk melihat log render.
      </p>
    </div>
  );
};

export default SandboxPage;