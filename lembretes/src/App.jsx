import React, { Component } from 'react';
import styles from './App.module.css';

import GerenciadorLembretes from './lembretes.js';
import { validarInputs } from './utils/validacao.js';

import LembreteForm from './components/LembreteForm';
import LembreteLista from './components/LembreteLista';
import MensagemErro from './components/MensagemErro';

class App extends Component {
    constructor(props) {
        super(props);
        this.gerenciador = new GerenciadorLembretes();
        this.state = {
            lembretes: {},
            nome: '',
            data: '',
            erro: '',
        };
    }

    handleAdicionarLembrete = (e) => {
        e.preventDefault();
        const { nome, data } = this.state;
        
        const erroValidacao = validarInputs(nome, data);
        if (erroValidacao) {
            this.setState({ erro: erroValidacao });
            return;
        }

        const novosLembretes = this.gerenciador.adicionarLembrete(nome, data);
        
        this.setState({
            lembretes: novosLembretes,
            nome: '',
            data: '',
            erro: '',
        });
    };

    handleDeletarLembrete = (dataLembrete, idParaDeletar) => {
        const novosLembretes = this.gerenciador.deletarLembrete(dataLembrete, idParaDeletar);
        this.setState({ lembretes: novosLembretes });
    };

    render() {
        const { nome, data, erro, lembretes } = this.state;
        const datasOrdenadas = this.gerenciador.getDatasOrdenadas();

        return (
            <div className={styles.container}>
                <h1>Novo lembrete</h1>
                <LembreteForm
                    nome={nome}
                    data={data}
                    onNomeChange={(e) => this.setState({ nome: e.target.value })}
                    onDataChange={(e) => this.setState({ data: e.target.value })}
                    onSubmit={this.handleAdicionarLembrete}
                />
                <MensagemErro mensagem={erro} />
                <LembreteLista
                    datasOrdenadas={datasOrdenadas}
                    lembretes={lembretes}
                    onDeletar={this.handleDeletarLembrete}
                />
            </div>
        );
    }
}

export default App;