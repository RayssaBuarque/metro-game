import React, {useMemo, useEffect} from "react";
import { Handle, Position, useUpdateNodeInternals } from "reactflow";

// Função de utilidade pra formatação do nome da estação
function get_textPos(textPos) {
    let [x, y] = textPos;

    if (x == 0)
        x = -45
    if (x == 1)
        x = 35
    if (x == -1)
        x = -60
    
    if (y == 0)
        y = 5
    if (y == 1)
        y = -25
    if (y == -1)
        y = 35

    return [x, y]
}

export default function Nodes({ data, id }) {
    const textPos = get_textPos(data.textPos) || [65, 0];
    const grau = data.grau || 45;

    const size = 18;
    const raio = size / 2;
    const updateNodeInternals = useUpdateNodeInternals();
    const cores = {
        azul: "var(--linha_1)",
        verde: `var(--linha_2)`,
        vermelha: "var(--linha_3)",
        amarela: "var(--linha_4)",
        lilas: "var(--linha_5)",
        rubi: "var(--linha_7)",
        diamante: "var(--linha_8)",
        esmeralda: `var(--linha_9)`,
        coral: `var(--linha_11)`,
        safira: `var(--linha_12)`
    };

    // Atualiza os handles do nó sempre que data.handles mudar
    useEffect(() => {
        updateNodeInternals(id);
    }, [data.handles, id, updateNodeInternals]);

    
    
    return (
        <div style={{ position: "relative", width: size, height: size }}>

           {/* Handles personalizados para cada conexão */}
            {data.handles?.map((handle, index) => {
                const rad = (handle.angulo * Math.PI) / 180;
                const x = raio + raio * Math.cos(rad);
                const y = raio + raio * Math.sin(rad);
                
                return (
                    <React.Fragment key={handle.id}>
                        <Handle
                            type="source"
                            id={handle.id}
                            position={Position.Custom}
                            style={{
                                left: x,
                                top: y,
                                opacity: 0,
                                position: 'absolute',
                                transform: 'translate(-50%, -50%)',
                                width: 5,
                                height: 5,
                                background: 'transparent'
                            }}
                        />
                        <Handle
                            type="target"
                            id={handle.id}
                            position={Position.Custom}
                            style={{
                                left: x,
                                top: y,
                                opacity: 0,
                                position: 'absolute',
                                transform: 'translate(-50%, -50%)',
                                width: 5,
                                height: 5,
                                background: 'transparent'
                            }}
                        />
                    </React.Fragment>
                );
            })}
            
            {/* Handles padrão como fallback */}
            {['right', 'left', 'top', 'bottom'].map(pos => (
                <React.Fragment key={pos}>
                    <Handle type="source" id={pos} position={Position[pos.toUpperCase()]} style={{ opacity: 0 }} />
                    <Handle type="target" id={pos} position={Position[pos.toUpperCase()]} style={{ opacity: 0 }} />
                </React.Fragment>
            ))}

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
                    top: textPos[1],
                    left: textPos[0],
                    fontSize: 10,
                    transform: `rotate(${grau}deg)`,
                    width: 60,
                    color: "var(--station_name)"
                }}>
                {data.label}
            </div>
        </div>
    );
}