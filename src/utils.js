// Função para encontrar estações vizinhas na linha
    // estacao = nome da estação de referência
    // linha = nome da linha (ex: "azul", "vermelha", etc.)
    // quantidade = número de estações vizinhas (anteriores e posteriores) a serem retornadas

export const encontrarVizinhos = (coord_linhas, estacoesDescobertas, estacao, linha, quantidade = 1) => {
    const ordemLinha = coord_linhas[linha].ordem;
    const index = ordemLinha.indexOf(estacao);
    
    if (index === -1) return [];
    
    const vizinhos = [];
    const inicio = Math.max(0, index - quantidade);
    const fim = Math.min(ordemLinha.length - 1, index + quantidade);
    
    for (let i = inicio; i <= fim; i++) {
        const estacaoVizinha = ordemLinha[i];
        
        if (estacoesDescobertas.includes(estacaoVizinha)) {
            vizinhos.push(estacaoVizinha);
        }
    }
    
    return vizinhos;
}

export default encontrarVizinhos;