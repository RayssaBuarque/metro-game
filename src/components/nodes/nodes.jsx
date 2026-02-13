import React, {useMemo, useEffect} from "react";
import { Handle, Position, useUpdateNodeInternals } from "reactflow";

export default function Nodes({ data, id }) {
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