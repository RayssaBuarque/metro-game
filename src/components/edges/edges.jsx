import { BaseEdge } from "reactflow";

export default function Edges({ sourceX, sourceY, targetX, targetY, style, sourceHandleId, targetHandleId }) {

    // INFORMAÇÕES BASE 
    const raio = 0.001;

    /*
        CÁLCULO DA POSIÇÃO DAS ARESTAS
            É preciso ajustar os pontos de início e fim das arestas para que saiam da borda dos círculos,
            e não do centro.
            1. Calcula o ângulo entre os nós de origem e destino
            2. Ajusta os pontos de início e fim da aresta com base nesse ângulo e no raio dos nós
            3. Cria o caminho da aresta usando os pontos ajustados
    */
    const extrairAnguloDoHandle = (handleId) => {
        if (!handleId) return null;
        const dx = targetX - sourceX;
        const dy = targetY - sourceY;
        return Math.atan2(dy, dx);
    };


    const usarHandlesPersonalizados = sourceHandleId && targetHandleId;
    let sourceAngulo, targetAngulo;

    if (usarHandlesPersonalizados) {
        sourceAngulo = extrairAnguloDoHandle(sourceHandleId);
        targetAngulo = extrairAnguloDoHandle(targetHandleId);
    }

    // Ângulo padrão baseado na direção source -> target
    const anguloPadrao = Math.atan2(targetY - sourceY, targetX - sourceX);
    const anguloSource = sourceAngulo !== null ? sourceAngulo : anguloPadrao;
    const anguloTarget = targetAngulo !== null ? targetAngulo + Math.PI : anguloPadrao + Math.PI;
    
    // Calcula os pontos ajustados baseados nos ângulos
    const newSourceX = sourceX + Math.cos(anguloSource) * raio;
    const newSourceY = sourceY + Math.sin(anguloSource) * raio;
    const newTargetX = targetX + Math.cos(anguloTarget) * raio;
    const newTargetY = targetY + Math.sin(anguloTarget) * raio;
    
    // Cria a aresta
    const path = `M ${newSourceX} ${newSourceY} L ${newTargetX} ${newTargetY}`;
    return <BaseEdge path={path} style={style} />;
}