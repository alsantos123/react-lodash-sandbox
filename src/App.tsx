import React from "react";
import * as _ from "lodash";
import * as util from "util";

import "./styles.css";

/**
 * Componente React principal
 */
export default function App() {
  const [redraws, setRedraws] = React.useState(0);
  const [output, setOutput] = React.useState("");
  const [ordered, setOrdered] = React.useState<null | any>(null);

  console.log(redraws);

  React.useEffect(() => {
    // onLoad
    const ordenado = groupBy(dataSet);
    setOrdered(ordenado);

    setOutput(util.inspect(ordenado, true, 4, false));

    console.log("ordenou => ", ordered);
  }, []);

  React.useMemo(() => {
    /// ????? como se compara com useEffect ?????
    // const ordered = fnOrdenarDataset(dataSet);
    // setOutput(util.inspect(ordered, true, 4, true));
    // console.log("ordenou => ", ordered);
  }, []);

  return (
    <div className="App">
      <h1>Redraws: {redraws} </h1>

      <button
        onClick={() => {
          setRedraws(redraws + 1);
        }}
      >
        Redraw
      </button>

      <DrawListaOrdenados ordered={ordered} />

      <pre>{output}</pre>
    </div>
  );
}

/**
 * Componente React secundário
 */
function DrawListaOrdenados(props: { ordered: null | any }) {
  const ordered = props.ordered;

  return (
    <div>
      {ordered ? (
        <ul>
          {(() => {
            const grupos = _.keys(ordered);
            const gruposAsc = _.orderBy(grupos, undefined, "desc");

            return gruposAsc.map((item) => (
              <li>
                {item}
                <ul>
                  {ordered[item].map((itemFilho: IProduto) => (
                    <li>
                      <b>{itemFilho.Titulo}</b> - R${" "}
                      {itemFilho.Preco.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </li>
            ));
          })()}
        </ul>
      ) : null}
    </div>
  );
}

/**
 * Função para agrupar o dataSet em Categorias.
 * @param dataSet
 * @returns um dicionario onde a chave é a string do grupo e o value é uma lista de IProduto[]
 */
function groupBy(dataSet: IProduto[]): any {
  console.log("pass fnOrdenarDataset()");
  return _.groupBy(dataSet, "Categoria");
}

interface IProduto {
  Id: number;
  Vid: number;
  Path: string;
  Language: string;

  Titulo: string;
  Preco: number;
  Descricao?: string;

  AeronaveTipo?: string | null;
  Categoria: string;
  FotoDestaque?: string | null;

  Adicionais: IProduto_Adicional[];
  TermoResponsa?: string;

  Waiver?: {
    Tipo: string;
    Id: number;
    Vid: number;
  };
}

interface IProduto_Adicional {
  Id: number;
  Vid: number;
  Titulo: string;
  Foto: string | null;
  Preco: number;
}

/**
 * Dados de teste
 */
const dataSet: IProduto[] = [
  {
    Id: 74,
    Vid: 165,
    Path: "/node/74",
    Language: "pt-br",
    Titulo: "Salto Duplo - Barra",
    Preco: 1470,
    AeronaveTipo: "Helicoptero",
    Aeroporto: {
      Titulo: "Barra da Tijuca",
      EnderecoURL: "https://goo.gl/maps/TbfP1RRvkwMXr6Sv8"
    },
    Categoria: "Tandem",
    FotoDestaque:
      "https://api-skydiverio.asantos.me/sites/default/files/styles/1280x720/public/2020-08/Tandem%20Heli%20Subida.png.jpeg?itok=xmz6B-kl",
    AdicionalIncluso: null,
    Adicionais: [
      {
        Id: 68,
        Vid: 174,
        Titulo: "Camera Hand",
        Foto: null,
        Preco: 105
      },
      {
        Id: 65,
        Vid: 172,
        Titulo: "Peso Extra",
        Foto: null,
        Preco: 105
      },
      {
        Id: 62,
        Vid: 173,
        Titulo: "Camera VIP Externa",
        Foto: null,
        Preco: 420
      }
    ],
    Waiver: {
      Tipo: "waiver_salto_duplo",
      Id: 59,
      Vid: 97
    }
  },
  {
    Id: 67,
    Vid: 176,
    Path: "/node/67",
    Language: "pt-br",
    Titulo: "Salto Duplo - Resende",
    Preco: 525,
    AeronaveTipo: "Aeronave",
    Aeroporto: {
      Titulo: "Resende",
      EnderecoURL:
        "https://www.google.com/maps?q=Aeroporto%20Resende&um=1&ie=UTF-8&sa=X&ved=2ahUKEwjHy7XsmcvpAhUpD7kGHagSB-0Q_AUoAXoECBcQAw"
    },
    Categoria: "Tandem",
    FotoDestaque:
      "https://api-skydiverio.asantos.me/sites/default/files/styles/1280x720/public/2020-08/Tandem%20Exit.png.jpeg?itok=kaRHhBy9",
    AdicionalIncluso: null,
    Adicionais: [
      {
        Id: 68,
        Vid: 174,
        Titulo: "Camera Hand",
        Foto: null,
        Preco: 105
      },
      {
        Id: 65,
        Vid: 172,
        Titulo: "Peso Extra",
        Foto: null,
        Preco: 105
      },
      {
        Id: 62,
        Vid: 173,
        Titulo: "Camera VIP Externa",
        Foto: null,
        Preco: 420
      }
    ],
    Waiver: {
      Tipo: "waiver_salto_duplo",
      Id: 59,
      Vid: 97
    }
  },
  {
    Id: 64,
    Vid: 177,
    Path: "/node/64",
    Language: "pt-br",
    Titulo: "Aluguel de equipamento",
    Preco: 105,
    AeronaveTipo: null,
    Aeroporto: {
      Titulo: null,
      EnderecoURL: null
    },
    Categoria: "Adicional",
    FotoDestaque: null,
    AdicionalIncluso: null,
    Adicionais: [],
    Waiver: null
  },
  {
    Id: 69,
    Vid: 179,
    Path: "/node/69",
    Language: "pt-br",
    Titulo: "Manifesto",
    Preco: 15.75,
    AeronaveTipo: null,
    Aeroporto: {
      Titulo: "Resende",
      EnderecoURL:
        "https://www.google.com/maps?q=Aeroporto%20Resende&um=1&ie=UTF-8&sa=X&ved=2ahUKEwjHy7XsmcvpAhUpD7kGHagSB-0Q_AUoAXoECBcQAw"
    },
    Categoria: "Adicional",
    FotoDestaque: null,
    AdicionalIncluso: null,
    Adicionais: [],
    Waiver: null
  },
  {
    Id: 73,
    Vid: 180,
    Path: "/node/73",
    Language: "pt-br",
    Titulo: "Solo",
    Preco: 157.5,
    AeronaveTipo: "Aeronave",
    Aeroporto: {
      Titulo: "Resende",
      EnderecoURL:
        "https://www.google.com/maps?q=Aeroporto%20Resende&um=1&ie=UTF-8&sa=X&ved=2ahUKEwjHy7XsmcvpAhUpD7kGHagSB-0Q_AUoAXoECBcQAw"
    },
    Categoria: "Atleta",
    FotoDestaque: null,
    AdicionalIncluso: null,
    Adicionais: [
      {
        Id: 69,
        Vid: 179,
        Titulo: "Manifesto",
        Foto: null,
        Preco: 15.75
      },
      {
        Id: 64,
        Vid: 177,
        Titulo: "Aluguel de equipamento",
        Foto: null,
        Preco: 105
      }
    ],
    Waiver: null
  },
  {
    Id: 70,
    Vid: 167,
    Path: "/node/70",
    Language: "pt-br",
    Titulo: "AFF Completo",
    Preco: 5040,
    AeronaveTipo: null,
    Aeroporto: {
      Titulo: "Resende",
      EnderecoURL:
        "https://www.google.com/maps?q=Aeroporto%20Resende&um=1&ie=UTF-8&sa=X&ved=2ahUKEwjHy7XsmcvpAhUpD7kGHagSB-0Q_AUoAXoECBcQAw"
    },
    Categoria: "AFF",
    FotoDestaque: null,
    AdicionalIncluso: null,
    Adicionais: [],
    Waiver: {
      Tipo: "waiver_atleta",
      Id: 58,
      Vid: 96
    }
  },
  {
    Id: 71,
    Vid: 171,
    Path: "/node/71",
    Language: "pt-br",
    Titulo: "AFF Nível 1 ou 2 ou 3",
    Preco: 834.75,
    AeronaveTipo: null,
    Aeroporto: {
      Titulo: "Resende",
      EnderecoURL:
        "https://www.google.com/maps?q=Aeroporto%20Resende&um=1&ie=UTF-8&sa=X&ved=2ahUKEwjHy7XsmcvpAhUpD7kGHagSB-0Q_AUoAXoECBcQAw"
    },
    Categoria: "AFF",
    FotoDestaque: null,
    AdicionalIncluso: null,
    Adicionais: [],
    Waiver: null
  },
  {
    Id: 72,
    Vid: 170,
    Path: "/node/72",
    Language: "pt-br",
    Titulo: "AFF Nível 4 ou 5 ou 6 ou 7",
    Preco: 593.25,
    AeronaveTipo: null,
    Aeroporto: {
      Titulo: "Resende",
      EnderecoURL:
        "https://www.google.com/maps?q=Aeroporto%20Resende&um=1&ie=UTF-8&sa=X&ved=2ahUKEwjHy7XsmcvpAhUpD7kGHagSB-0Q_AUoAXoECBcQAw"
    },
    Categoria: "AFF",
    FotoDestaque: null,
    AdicionalIncluso: null,
    Adicionais: [],
    Waiver: null
  },
  {
    Id: 68,
    Vid: 174,
    Path: "/node/68",
    Language: "pt-br",
    Titulo: "Camera Hand",
    Preco: 105,
    AeronaveTipo: null,
    Aeroporto: {
      Titulo: null,
      EnderecoURL: null
    },
    Categoria: "Adicional",
    FotoDestaque: null,
    AdicionalIncluso: null,
    Adicionais: [],
    Waiver: null
  },
  {
    Id: 62,
    Vid: 173,
    Path: "/node/62",
    Language: "pt-br",
    Titulo: "Camera VIP Externa",
    Preco: 420,
    AeronaveTipo: null,
    Aeroporto: {
      Titulo: null,
      EnderecoURL: null
    },
    Categoria: "Adicional",
    FotoDestaque: null,
    AdicionalIncluso: null,
    Adicionais: [],
    Waiver: null
  },
  {
    Id: 65,
    Vid: 172,
    Path: "/node/65",
    Language: "pt-br",
    Titulo: "Peso Extra",
    Preco: 105,
    AeronaveTipo: null,
    Aeroporto: {
      Titulo: null,
      EnderecoURL: null
    },
    Categoria: "Adicional",
    FotoDestaque: null,
    AdicionalIncluso: null,
    Adicionais: [],
    Waiver: null
  }
];
