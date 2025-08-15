export const validarInputs = (nome, data) => {
    if (!nome.trim()) {
        return 'O campo "Nome" é obrigatório.';
    }
    if (!data) {
        return 'O campo "Data" é obrigatório.';
    }

    const parts = data.split('/');
    if (parts.length !== 3) {
        return 'Formato de data inválido. Use dd/mm/yyyy.';
    }

    const [dia, mes, ano] = parts.map(p => parseInt(p, 10));

    if (isNaN(dia) || isNaN(mes) || isNaN(ano) || dia < 1 || dia > 31 || mes < 1 || mes > 12 || ano < 1000) {
        return 'Data inválida. Verifique os valores de dia, mês e ano.';
    }

    const dataLembrete = new Date(ano, mes - 1, dia);
    const hoje = new Date();

    hoje.setHours(0, 0, 0, 0);
    dataLembrete.setHours(0, 0, 0, 0);

    if (dataLembrete.getDate() !== dia || dataLembrete.getMonth() !== mes - 1 || dataLembrete.getFullYear() !== ano) {
        return 'Data inválida. O dia não corresponde ao mês.';
    }

    if (dataLembrete <= hoje) {
        return 'A data deve ser no futuro.';
    }

    return null;
};