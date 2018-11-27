import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import Timeline from "./components/timeline/Timeline";
import Waiting from "./components/waiting/Waiting"
import NavBar from "./components/navbar/NavBar";
import './App.css';

class App extends Component {

  componentWillMount() {
    this.setState({
      recommends: [
        {
          id: "recommend3",
          tipo: "1 ano",
          texto: "12%"
        },
        {
          id: "recommend4",
          tipo: "2 anos",
          texto: "12,7%"
        },
        {
          id: "recommend5",
          tipo: "3 anos",
          texto: "13%"
        },
        {
          id: "recommend5",
          tipo: "4 anos",
          texto: "13,6%"
        }
      ],
      recommendsPos: [
        {
          id: "recommend3",
          tipo: "1 ano",
          texto: "107% CDI"
        },
        {
          id: "recommend4",
          tipo: "2 anos",
          texto: "115% CDI"
        },
        {
          id: "recommend5",
          tipo: "3 anos",
          texto: "122% CDI"
        },
        {
          id: "recommend5",
          tipo: "4 anos",
          texto: "127% CDI"
        }
      ],
      recommendsIpca: [
        {
          id: "recommend3",
          tipo: "1 ano",
          texto: "IPCA + 5,6%"
        },
        {
          id: "recommend4",
          tipo: "2 anos",
          texto: "IPCA + 5,9%"
        },
        {
          id: "recommend5",
          tipo: "3 anos",
          texto: "IPCA + 6,5%"
        },
        ,
        {
          id: "recommend5",
          tipo: "4 anos",
          texto: "IPCA + 6,9%"
        }
      ],
      posts: [
        {
          id: 20,
          titulo: "gustavo",
          autor: "gustavo",
          analise:
            "Tesouro Direto aumentou as taxas esta semana e sobe agora para 11,8%, o que representa um rendimento de 11% líquido. Neste momento então o Tesouro Direto está rendendo 150% a MAIS que a poupança, que no momento continua em 5% ao ano. Boa opção de Renda Fixa para quem deseja investir valores baixos.",
          conteudo: {
            tipo: "rate",
            titulo: "11,8%",
            texto: "#tesourodireto"
          }
        },
        {
          id: 1,
          titulo: "#jurosfuturo #cdi",
          autor: "gustavo",
          analise:
            "Juros Futuros voltou a subir um pouco com a melhora da inflação. A alta dessa semana reforça SELIC acima de 10% para 3 anos. Então para quem vai investir em títulos atrelados ao CDI, o rendimento médio do CDI deve ser perto de 10,38% ao ano para investimentos de 3 anos.",
          conteudo: {
            tipo: "grafico-multlinear",
            data: [
              { name: "30 dias", cdi: 6 },
              { name: "60 dias", cdi: 7 },
              { name: "87 dias", cdi: 7 },
              { name: "120 dias", cdi: 9 },
              { name: "265 dias", cdi: 8 },
              { name: "900 dias", cdi: 10.38 }
            ],
            series: [{ nome: "cdi", color: "#8884d8" }]
          }
        },
        {
          id: 1,
          titulo: "#renda fixa",
          autor: "gustavo",
          analise:
            "Comparativo do rendimento esperado para CDB de 2 anos (vermelho), 3 anos (verde) e 4 anos (azul). Olha o bom rendimento de títulos de 4 anos. O CDB da Oram de 120% CDI em 4 anos é a opção do gráfico azul.",
          conteudo: {
            tipo: "grafico-multlinear",
            data: [
              { name: "", cdb_4anos: 0, cdb_3anos: 0, cdb_2anos: 0 },
              { name: "1 ano", cdb_4anos: 1.9, cdb_3anos: 1.8, cdb_2anos: 1.7 },
              { name: "2 anos", cdb_4anos: 7, cdb_3anos: 6.5, cdb_2anos: 6.2 },
              { name: "3 anos", cdb_4anos: 18, cdb_3anos: 14 },
              { name: "4 anos", cdb_4anos: 30 }
            ],
            series: [
              { nome: "cdb_2anos", color: "#ff0000" },
              { nome: "cdb_3anos", color: "#82ca9d" },
              { nome: "cdb_4anos", color: "#8884d8" }
            ]
          }
        },
        {
          id: 8,
          titulo: "#dolar",
          analise:
            "Dolar em R$ 3,43 pra quem vai comprar papel moeda. Quer saber perto da sua região? Olha na www.exchange.com.br. #dica #parceiros ",
          autor: "botjurus",
          conteudo: {
            tipo: ""
          }
        },
        {
          id: 1,
          titulo: "#renda fixa",
          autor: "gustavo",
          analise:
            "Pra quem precisa de investimento com liquidez diária, ou seja, que possa sacar o dinheiro a qualquer momento, olha o rendimento como está. Lucro líquido de 35%, já descontado o I.R. Se sacar antes, vai ser proporcional.",
          conteudo: {
            tipo: "rate",
            titulo: "101% CDI",
            texto: "#liquidezdiária"
          }
        },
        {
          id: 8,
          titulo: "#bitcoin",
          analise: "Bitcoin subindo 8% neste momeeentoooooo!!!!",
          autor: "botjurus",
          conteudo: {
            tipo: "gif",
            url: "https://media.giphy.com/media/l0HFkA6omUyjVYqw8/giphy.gif"
          }
        },
        {
          id: 8,
          titulo: "#tesourodireto",
          analise:
            "Tesouro Direto pagando 13,9% ou Inflação + 5,9%. Taxas aumentaram um pouco em relação a ontem.",
          autor: "botjurus",
          conteudo: {
            tipo: ""
          }
        },
        {
          id: 8,
          titulo: "#medium",
          analise:
            "Pessoal tem artigo novo no nosso medium. Artigo sobre investimentos lastreado em imoveis. Saca aqui!!!",
          autor: "gustavo",
          conteudo: {
            tipo: ""
          }
        },
        {
          id: 18,
          titulo: "#inflação",
          autor: "botjurus",
          analise:
            "Boletim Focus aponta para queda na inflação ano que vem, em 2,57% ao ano. Dragão tá bonzinho. #melhorassim #naomexe",
          conteudo: {
            tipo: "gif",
            url: "https://media.giphy.com/media/fwmEbL2RCQL0A/giphy.gif"
          }
        },
        {
          id: 28,
          titulo: "#cdb #lci",
          autor: "botjurus",
          analise:
            "CDB ou LCI? CDB continuam com taxas maiores para todos os periodos.",
          conteudo: {
            tipo: "imagem"
          }
        }
      ]
    });
  }


  render() {
    return (
      <div className="App">
      <NavBar />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Timeline
                posts={this.state.posts}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
