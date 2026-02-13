export const coord_estacoes = {

  // LINHA 4 - AMARELA
  "Vila Sônia": {
    id: "vila_sonia",
    x: 400,
    y: 200,
    grau: 45,
    textPos: [0, -1],
    linhas: ["amarela"]
  },
  "São Paulo - Morumbi": {
    id: "sao_paulo_morumbi",
    x: 500,
    y: 200,
    grau: 45,
    textPos: [0, -1],
    linhas: ["amarela"]
  },
  "Butantã": {
    id: "butanta",
    x: 600,
    y: 200,
    grau: 45,
    textPos: [0, -1],
    linhas: ["amarela"]
  },
  "Pinheiros": {
    id: "pinheiros",
    x: 700,
    y: 200,
    grau: 45,
    textPos: [-1, 1],
    linhas: ["amarela", "esmeralda"]
  },
  "Faria Lima": {
    id: "faria_lima",
    x: 800,
    y: 200,
    grau: 45,
    textPos: [0, 1],
    linhas: ["amarela"]
  },
  "Fradique Coutinho": {
    id: "fradique_coutinho",
    x: 900,
    y: 200,
    grau: 45,
    textPos: [0, -1],
    linhas: ["amarela"]
  },
  "Oscar Freire": {
    id: "oscar_freire",
    x: 1000,
    y: 200,
    grau: 45,
    textPos: [0, -1],
    linhas: ["amarela"]
  },
  "Paulista": {
    id: "paulista",
    x: 1100,
    y: 150,
    grau: 45,
    textPos: [-1, 1],
    linhas: ["amarela"]
  },
  "Higienópolis - Mackenzie": {
    id: "higienopolis_mackenzie",
    x: 1200,
    y: 100,
    grau: 45,
    textPos: [-1, 1],
    linhas: ["amarela"]
  },
  "República": {
    id: "republica",
    x: 1300,
    y: 50,
    grau: 45,
    textPos: [-1, 1],
    linhas: ["amarela", "vermelha"]
  },
  "Luz": {
    id: "luz",
    x: 1400,
    y: 0,
    grau: 45,
    textPos: [1, 0],
    linhas: ["amarela", "azul", "coral"]
  },

  // LINHA 9 - ESMERALDA
  "Ceasa": {
    id: "ceasa",
    x: 700,
    y: -25,
    grau: 0,
    textPos: [-1, 0],
    linhas: ["esmeralda"]
  },
  "Villa Lobos - Jaguaré": {
    id: "villa_lobos_jaguaré",
    x: 700,
    y: 50,
    grau: 0,
    textPos: [-1, 0],
    linhas: ["esmeralda"]
  },
  "Cidade Universitária": {
    id: "cidade_universitaria",
    x: 700,
    y: 125,
    grau: 0,
    textPos: [-1, 0],
    linhas: ["esmeralda"]
  },
  //
  // pinheiros
  //
  "Hebraica - Rebouças": {
    id: "hebraica_reboucas",
    x: 700,
    y: 275,
    grau: 0,
    textPos: [-1, 0],
    linhas: ["esmeralda"]
  },
  "Cidade Jardim": {
    id: "cidade_jardim",
    x: 700,
    y: 350,
    grau: 0,
    textPos: [-1, 0],
    linhas: ["esmeralda"]
  },
  "Vila Olímpia": {
    id: "vila_olimpia",
    x: 700,
    y: 425,
    grau: 0,
    textPos: [-1, 0],
    linhas: ["esmeralda"]
  },
  "Berrini": {
    id: "berrini",
    x: 700,
    y: 500,
    grau: 0,
    textPos: [-1, 0],
    linhas: ["esmeralda"]
  },
  "Morumbi": {
    id: "morumbi",
    x: 700,
    y: 575,
    grau: 0,
    textPos: [-1, 0],
    linhas: ["esmeralda"]
  },
  "Granja Julieta": {
    id: "granja_julieta",
    x: 700,
    y: 650,
    grau: 0,
    textPos: [-1, 0],
    linhas: ["esmeralda"]
  },
  "João Dias": {
    id: "joao_dias",
    x: 700,
    y: 725,
    grau: 0,
    textPos: [-1, 0],
    linhas: ["esmeralda"]
  },
  "Santo Amaro": {
    id: "santo_amaro",
    x: 700,
    y: 800,
    grau: 45,
    textPos: [1, -1],
    linhas: ["esmeralda"]
  },
  "Socorro": {
    id: "socorro",
    x: 700,
    y: 875,
    grau: 0,
    textPos: [-1, 0],
    linhas: ["esmeralda"]
  },
  "Jurubatuba": {
    id: "jurubatuba",
    x: 700,
    y: 950,
    grau: 0,
    textPos: [-1, 0],
    linhas: ["esmeralda"]
  },
  "Autódromo": {
    id: "autodromo",
    x: 700,
    y: 1025,
    grau: 0,
    textPos: [-1, 0],
    linhas: ["esmeralda"]
  },
  "Primavera - Interlagos": {
    id: "primavera_interlagos",
    x: 700,
    y: 1100,
    grau: 0,
    textPos: [-1, 0],
    linhas: ["esmeralda"]
  },
  "Grajaú": {
    id: "grajau",
    x: 700,
    y: 1175,
    grau: 0,
    textPos: [-1, 0],
    linhas: ["esmeralda"]
  },
  "Mendes - Vila Natal": {
    id: "mendes_vila_natal",
    x: 700,
    y: 1250,
    grau: 0,
    textPos: [-1, 0],
    linhas: ["esmeralda"]
  },
  "Varginha": {
    id: "varginha",
    x: 700,
    y: 1325,
    grau: 0,
    textPos: [-1, 0],
    linhas: ["esmeralda"]
  },
};

export const coord_linhas = {
  azul: {
    cor: "var(--linha_1)",
    ordem: [
      "Tucuruvi",
      "Parada Inglesa",
      "Luz",
      "São Bento"
    ]
  },
  amarela: {
    cor: "var(--linha_4)",
    ordem: [
      "Vila Sônia",
      "São Paulo - Morumbi",
      "Butantã",
      "Pinheiros",
      "Faria Lima",
      "Fradique Coutinho",
      "Oscar Freire",
      "Paulista",
      "Higienópolis - Mackenzie",
      "República",
      "Luz"
    ]
  },
  esmeralda: {
    cor: "var(--linha_9)",
    ordem: [
      "Ceasa",
      "Villa Lobos - Jaguaré",
      "Cidade Universitária",
      "Pinheiros",
      "Hebraica - Rebouças",
      "Cidade Jardim",
      "Vila Olímpia",
      "Berrini",
      "Morumbi",
      "Granja Julieta",
      "João Dias",
      "Santo Amaro",
      "Socorro",
      "Jurubatuba",
      "Autódromo",
      "Primavera - Interlagos",
      "Grajaú",
      "Mendes - Vila Natal",
      "Varginha"
    ]
  }
}