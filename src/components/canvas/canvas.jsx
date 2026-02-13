import React from "react";
import ReactFlow, { Controls } from "reactflow";
import "reactflow/dist/style.css";
import { coord_estacoes, coord_linhas } from "../../data/estacoes";
import Node from "../nodes/nodes";

const nodeTypes = {
  metro: Node
};

export function Canvas({ estacoesDescobertas }) {

    // ESTRUTURA DOS NÓS DA REDE DO METRÔ
    const nodes = estacoesDescobertas.map(nome => {
        const e = coord_estacoes[nome];
        return {
        id: e.id,
        type: "metro",
        position: { x: e.x, y: e.y },
        data: {
            label: nome,
            linha: e.linhas[0]
        },
        };
    });

    const edges = [];

    // Pega só as estações descobertas
    Object.entries(coord_linhas).forEach(([linha, info]) => {
        const desbloqueadas = info.ordem.filter(e =>
            estacoesDescobertas.includes(e)
        );

        for (let i = 0; i < desbloqueadas.length - 1; i++) {
            edges.push({
                id: `${desbloqueadas[i]}-${desbloqueadas[i+1]}-${linha}`,
                source: coord_estacoes[desbloqueadas[i]].id,
                target: coord_estacoes[desbloqueadas[i+1]].id,
                style: { stroke: info.cor, strokeWidth: 5 },
                type: 'straight'
            });
        }
    });

    return (
        <div style={{ width: "100%", height: "80vh" }}>
        <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes}>
            <Controls />
        </ReactFlow>
        </div>
    );
}