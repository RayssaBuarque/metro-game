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
            background: "white",
            border: `4px solid ${cores[data.linha]}`,
            boxShadow: "0 0 6px rgba(0,0,0,0.5)"
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
            color: "black"
        }}>
        {data.label}
      </div>
    </div>
  );
}