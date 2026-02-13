import React from "react";
import { Handle, Position } from "reactflow";

export default function Nodes({ data }) {
  const cores = {
    azul: "#003DA5",
    verde: "#00A650",
    vermelha: "#EE1C25",
    amarela: "#FFD100"
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Conectores invisíveis */}
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />

      {/* Círculo */}
      <div
        style={{
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: `${cores[data.linha]}`,
            border: `4px solid white`,
            boxShadow: "0 0 6px rgba(0, 0, 0, 0.16)"
        }}
      />

      {/* Nome */}
      <div style={{
            position: "absolute",
            textAlign: "left",
            top: 65,
            fontSize: 10,
            transform: "rotate(45deg)",
            width: 100,
            color: "var(--station_name)"
        }}>
        {data.label}
      </div>
    </div>
  );
}