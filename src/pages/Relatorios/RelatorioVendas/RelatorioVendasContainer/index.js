import React, { Component } from "react";
import "./index.css";
import { Button, Input } from "antd";
import { GetRelatVendas } from "../../../../services/produto";

class RelatorioVendasContainer extends Component {
  state = {
    page: 1,
    total: 10,
    count: 0,
    show: 0,
    produto: "",
    avancado: false,
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  avancado = () => {
    this.setState({
      avancado: !this.state.avancado,
    });
  };

  componentDidMount = async () => {
    await this.getRelatVendas();
  };

  getRelatVendas = async () => {
    const { status, data } = await GetRelatVendas();

    if (status === 200) this.setState({ rows: data.rows });
  };

  changePages = (pages) => {
    this.setState(
      {
        page: pages,
      }
      // () => {
      //   this.getVendas();
      // }
    );
  };

  Pages = () => (
    <div className="footer-Gentrada-button">
      {Math.ceil(this.state.count / this.state.total) >= 5 &&
      Math.ceil(this.state.count / this.state.total) - this.state.page < 1 ? (
        <Button
          className="button"
          type="primary"
          onClick={() => this.changePages(this.state.page - 4)}
        >
          {this.state.page - 4}
        </Button>
      ) : null}
      {Math.ceil(this.state.count / this.state.total) >= 4 &&
      Math.ceil(this.state.count / this.state.total) - this.state.page < 2 &&
      this.state.page > 3 ? (
        <Button
          className="button"
          type="primary"
          onClick={() => this.changePages(this.state.page - 3)}
        >
          {this.state.page - 3}
        </Button>
      ) : null}
      {this.state.page >= 3 ? (
        <Button
          className="button"
          type="primary"
          onClick={() => this.changePages(this.state.page - 2)}
        >
          {this.state.page - 2}
        </Button>
      ) : null}
      {this.state.page >= 2 ? (
        <Button
          className="button"
          type="primary"
          onClick={() => this.changePages(this.state.page - 1)}
        >
          {this.state.page - 1}
        </Button>
      ) : null}
      <div className="div-teste">{this.state.page}</div>
      {this.state.page < this.state.count / this.state.total ? (
        <Button
          className="button"
          type="primary"
          onClick={() => this.changePages(this.state.page + 1)}
        >
          {this.state.page + 1}
        </Button>
      ) : null}
      {this.state.page + 1 < this.state.count / this.state.total ? (
        <Button
          className="button"
          type="primary"
          onClick={() => this.changePages(this.state.page + 2)}
        >
          {this.state.page + 2}
        </Button>
      ) : null}
      {this.state.page + 2 < this.state.count / this.state.total &&
      this.state.page < 3 ? (
        <Button
          className="button"
          type="primary"
          onClick={() => this.changePages(this.state.page + 3)}
        >
          {this.state.page + 3}
        </Button>
      ) : null}
      {this.state.page + 3 < this.state.count / this.state.total &&
      this.state.page < 2 ? (
        <Button
          className="button"
          type="primary"
          onClick={() => this.changePages(this.state.page + 4)}
        >
          {this.state.page + 4}
        </Button>
      ) : null}
    </div>
  );

  render() {
    return (
      <div className="div-card-RPerda">
        <div className="linhaTexto-RPerda">
          <h1 className="h1-RPerda">Relatório de vendas</h1>
        </div>

        {this.state.avancado ? (
          <div className="div-linha-avancado-Rtecnico">
            <div className="div-ocultar-Rtecnico">
              <Button type="primary" className="button" onClick={this.avancado}>
                Ocultar
              </Button>
            </div>
            <div className="div-linha1-avancado-Rtecnico">
              <div className="div-produto-relVendas">
                <div className="div-text-Os">Produto:</div>
                <Input
                  className="input-100"
                  style={{ width: "100%" }}
                  name="produto"
                  value={this.state.produto}
                  placeholder="Digite o nome do produto"
                  onChange={this.onChange}
                  allowClear
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="div-avancado-Rtecnico">
            <Button type="primary" className="button" onClick={this.avancado}>
              Avançado
            </Button>
          </div>
        )}

        <div className="div-cabecalho-Gentrada">
          <div className="cel-produto-cabecalho-Gentrada">Produto</div>
          <div className="cel-quant-cabecalho-Gentrada">Qnt.</div>
          <div className="cel-usuario-cabecalho-Gentrada">Usuário</div>
          <div className="cel-data-cabecalho-Gentrada">Data atualização</div>
        </div>

        <this.Pages />
      </div>
    );
  }
}

export default RelatorioVendasContainer;
