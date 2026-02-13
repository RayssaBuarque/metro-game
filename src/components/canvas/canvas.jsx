import React from "react";
import ReactFlow, { Controls, Background } from "reactflow";
import "reactflow/dist/style.css";
import { coord_estacoes, coord_linhas } from "../../data/estacoes";
import Nodes from "../nodes/nodes";
import Edges from "../edges/edges";

// Configurando os tipos de Nós e Arestas para o React Flow
const nodeTypes = {
    metro: Nodes
};
const edgeTypes = {
    metro: Edges,
};

export function Canvas({ estacoesDescobertas }) {

    // Função para calcular o ângulo exato entre dois pontos
    function calcularAngulo(estacaoOrigem, estacaoDestino) {
        const dx = estacaoDestino.x - estacaoOrigem.x;
        const dy = estacaoDestino.y - estacaoOrigem.y;
        const angulo = Math.atan2(dy, dx);
        
        // Converte para graus
        return (angulo * 180 / Math.PI + 360) % 360;
    }

    /*
        LÓGICA DE CONSTRUÇÃO DO GRAFO COM NÓS DESCOBERTOS
            1. Para cada linha, verificamos quais estações já foram descobertas
            2. Para cada par de estações consecutivas descobertas, calcula-se o melhor ângulo entre elas
                para determinar quais handles severão ser utilizados (top, bottom, left, right...)
            3. Inclusão de novo nó no grafo, utilizando os graus de handles calculados
    */
    const nodes = estacoesDescobertas.map(nome => {
        const e = coord_estacoes[nome];
        const textPos = e.textPos;
        const grau = e.grau;
        const handles = [];

        Object.entries(coord_linhas).forEach(([linha, info]) => {
            const index = info.ordem.indexOf(nome);

            if (index !== -1) {
                if (index > 0) {
                    const anterior = info.ordem[index - 1];
                    if (estacoesDescobertas.includes(anterior)) {
                        handles.push({
                            id: `${e.id}-${coord_estacoes[anterior].id}`,
                            angulo: calcularAngulo(e, coord_estacoes[anterior])
                        });
                    }
                }
                if (index < info.ordem.length - 1) {
                    const proxima = info.ordem[index + 1];
                    if (estacoesDescobertas.includes(proxima)) {
                        handles.push({
                            id: `${e.id}-${coord_estacoes[proxima].id}`,
                            angulo: calcularAngulo(e, coord_estacoes[proxima])
                        });
                    }
                }
            }
        });

        return {
            id: e.id,
            position: { x: e.x, y: e.y },
            data: {
                label: nome,
                linha: e.linhas[0],
                handles: handles,
                textPos: textPos,
                grau: grau
            },
            type: "metro",
        };
    }, [estacoesDescobertas]);

  
    /*
        LÓGICA DE CONSTRUÇÃO DO GRAFO COM ARESTAS DESCOBERTAS
            1. Para cada linha, verificamos quais estações já foram descobertas
            2. Para cada par de estações consecutivas descobertas, encontramos as conexões
                válidas entre elas
            3. Inclusão de nova aresta no grafo
    */
    const edges = [];
    Object.entries(coord_linhas).forEach(([linha, info]) => {
        const desbloqueadas = info.ordem.filter(e =>
            estacoesDescobertas.includes(e)
        );

        for (let i = 0; i < desbloqueadas.length - 1; i++) {
            const estacaoAtual = desbloqueadas[i];
            const proximaEstacao = desbloqueadas[i + 1];

            const idAtual = coord_estacoes[estacaoAtual].id;
            const idProximo = coord_estacoes[proximaEstacao].id;

            // Coordenadas das handles de cada nó
            const handleSourceId = `${idAtual}-${idProximo}`;
            const handleTargetId = `${idProximo}-${idAtual}`;

            // Inclusão de nova aresta no grafo
            edges.push({
                id: `${estacaoAtual}-${proximaEstacao}`,
                source: idAtual,
                target: idProximo,
                sourceHandle: handleSourceId,
                targetHandle: handleTargetId,
                style: { stroke: info.cor, strokeWidth: 5 },
                type: 'metro'
            });
        }
    });

    return (
        <div style={{ width: "100%", height: "72vh" }}>
            <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} edgeTypes={edgeTypes} defaultEdgeOptions={{ type: 'metro' }}>
                <Background 
                    color="var(--grid)"
                    gap={100}
                    size={2}
                    variant="lines"
                    />
                <Controls />
            </ReactFlow>
        </div>
    );
}