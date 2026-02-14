import React, { useEffect, useRef } from "react";
import ReactFlow, { Controls, Background, useReactFlow, ReactFlowProvider } from "reactflow";
import encontrarVizinhos from "../../utils";
import "reactflow/dist/style.css";

// Dados sobre as estações
import { coord_estacoes, coord_linhas } from "../../data/estacoes";

// Componentes de nós e arestas
import Nodes from "../nodes/nodes";
import Edges from "../edges/edges";

// Configurando os tipos de Nós e Arestas para o React Flow
const nodeTypes = {
    metro: Nodes
};
const edgeTypes = {
    metro: Edges,
};

// Componente interno que tem acesso ao useReactFlow
function FlowContent({ estacoesDescobertas }) {
    const { fitView } = useReactFlow();
    const prevEstacoesRef = useRef(estacoesDescobertas);

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
    });
  
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

    // Centralizando o canvas no nó descoberto a cada inserção de nó, com timeout pra garantir renderização
    useEffect(() => {
        const estacoesAnteriores = prevEstacoesRef.current;
        const novasEstacoes = estacoesDescobertas.filter(
            estacao => !estacoesAnteriores.includes(estacao)
        );
        
        if (novasEstacoes.length > 0) {
            const ultimaEstacao = novasEstacoes[novasEstacoes.length - 1];
            const e = coord_estacoes[ultimaEstacao];
            
            // Encontra os vizinhos (5 antes, 5 depois) na mesma linha (prioriza primeira linha)
            const linhaPrincipal = e.linhas[0];
            const vizinhos = encontrarVizinhos(coord_linhas, estacoesDescobertas, ultimaEstacao, linhaPrincipal, 5);
            const nodesParaFocar = vizinhos.map(nome => ({
                id: coord_estacoes[nome].id
            }));
            
            // Se não houver vizinhos suficientes, foca pelo menos na própria estação
            if (nodesParaFocar.length === 0) {
                nodesParaFocar.push({ id: e.id });
            }
            
            setTimeout(() => { // timeout pra facilitar renderização
                fitView({
                    duration: 800,
                    padding: 0.3, 
                    nodes: nodesParaFocar,
                    maxZoom: 1.5, 
                    minZoom: 0.5  
                });
            }, 150);
        }
        
        prevEstacoesRef.current = estacoesDescobertas;
    }, [estacoesDescobertas, fitView]);

    return (
        <ReactFlow 
            nodes={nodes} 
            edges={edges} 
            nodeTypes={nodeTypes} 
            edgeTypes={edgeTypes} 
            defaultEdgeOptions={{ type: 'metro' }}
        >
            <Background 
                color="var(--grid)"
                gap={100}
                size={2}
                variant="lines"
            />
            <Controls />
        </ReactFlow>
    );
}

// Componente principal que envolve o Flow com o Provider
export function Canvas({ estacoesDescobertas }) {
    return (
        <div style={{ width: "100%", height: "72vh" }}>
            <ReactFlowProvider>
                <FlowContent estacoesDescobertas={estacoesDescobertas} />
            </ReactFlowProvider>
        </div>
    );
}