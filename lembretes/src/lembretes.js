class Lembrete {
    constructor(nome) {
        if (!nome || !nome.trim()) {
            throw new Error('O nome do lembrete não pode ser vazio.');
        }
        this.id = Date.now();
        this.nome = nome.trim();
    }
}

class GerenciadorLembretes {
    constructor() {
        this.lembretes = {};
    }

    adicionarLembrete(nome, data) {
        const novoLembrete = new Lembrete(nome);
        const lembretesDoDia = this.lembretes[data] ? [...this.lembretes[data], novoLembrete] : [novoLembrete];
        
        this.lembretes[data] = lembretesDoDia;
        return { ...this.lembretes };
    }

    deletarLembrete(dataLembrete, idParaDeletar) {
        const novosLembretesDoDia = this.lembretes[dataLembrete].filter(lembrete => lembrete.id !== idParaDeletar);

        if (novosLembretesDoDia.length > 0) {
            this.lembretes[dataLembrete] = novosLembretesDoDia;
        } else {
            delete this.lembretes[dataLembrete];
        }
        return { ...this.lembretes };
    }

    getDatasOrdenadas() {
        return Object.keys(this.lembretes).sort((a, b) => {
            const [diaA, mesA, anoA] = a.split('/').map(Number);
            const [diaB, mesB, anoB] = b.split('/').map(Number);
            return new Date(anoA, mesA - 1, diaA) - new Date(anoB, mesB - 1, diaB);
        });
    }
}

export default GerenciadorLembretes;