import { useState } from 'react';
import './App.css';

function App() {
	const [lembretes, setLembretes] = useState({});
	const [nome, setNome] = useState('');
	const [data, setData] = useState('');
	const [erro, setErro] = useState('');

	const handleAdicionarLembrete = (e) => {
		e.preventDefault();

		if (!nome.trim()) {
			setErro('O campo "Nome" é obrigatório.');
			return;
		}
		if (!data) {
			setErro('O campo "Data" é obrigatório.');
			return;
		}

		const parts = data.split('/');
		if (parts.length !== 3) {
			setErro('Formato de data inválido. Use dd/mm/yyyy.');
			return;
		}
		const [dia, mes, ano] = parts.map(p => parseInt(p, 10));

		if (isNaN(dia) || isNaN(mes) || isNaN(ano) || dia < 1 || dia > 31 || mes < 1 || mes > 12 || ano < 1000) {
			setErro('Data inválida. Verifique os valores de dia, mês e ano.');
			return;
		}

		const dataLembrete = new Date(ano, mes - 1, dia);
		const hoje = new Date();

		hoje.setHours(0, 0, 0, 0);
		dataLembrete.setHours(0, 0, 0, 0);


		if (dataLembrete.getDate() !== dia || dataLembrete.getMonth() !== mes - 1 || dataLembrete.getFullYear() !== ano) {
			setErro('Data inválida. O dia não corresponde ao mês.');
			return;
		}

		if (dataLembrete <= hoje) {
			setErro('A data deve ser no futuro.');
			return;
		}

		setErro('');

		const novoLembrete = {
			id: Date.now(),
			nome: nome.trim(),
		};

		setLembretes(prevLembretes => {
			const lembretesDoDia = prevLembretes[data] ? [...prevLembretes[data], novoLembrete] : [novoLembrete];
			return {
				...prevLembretes,
				[data]: lembretesDoDia,
			};
		});

		setNome('');
		setData('');
	};

	const handleDeletarLembrete = (dataLembrete, idParaDeletar) => {
		setLembretes(prevLembretes => {
			const novosLembretesDoDia = prevLembretes[dataLembrete].filter(lembrete => lembrete.id !== idParaDeletar);
			const novosLembretes = { ...prevLembretes };

			if (novosLembretesDoDia.length > 0) {
				novosLembretes[dataLembrete] = novosLembretesDoDia;
			} else {
				delete novosLembretes[dataLembrete];
			}
			return novosLembretes;
		});
	};

	const datasOrdenadas = Object.keys(lembretes).sort((a, b) => {
		const [diaA, mesA, anoA] = a.split('/').map(Number);
		const [diaB, mesB, anoB] = b.split('/').map(Number);
		return new Date(anoA, mesA - 1, diaA) - new Date(anoB, mesB - 1, diaB);
	});

	return (
		<div className="container">
			<h1>Novo lembrete</h1>
			<form onSubmit={handleAdicionarLembrete} className="form-lembrete">
				<div className="form-grupo">
					<label htmlFor="nome">Nome</label>
					<input
						id="nome"
						type="text"
						placeholder="Nome do lembrete"
						value={nome}
						onChange={(e) => setNome(e.target.value)}
					/>
				</div>
				<div className="form-grupo">
					<label htmlFor="data">Data</label>
					<input
						id="data"
						type="text"
						placeholder="Data do lembrete (no formato dd/mm/yyyy)"
						value={data}
						onChange={(e) => setData(e.target.value)}
					/>
				</div>
				<button type="submit">Criar</button>
			</form>
			{erro && <p className="mensagem-erro">{erro}</p>}

			<div className="lista-container">
				<h2>Lista de lembretes</h2>
				{datasOrdenadas.length > 0 ? (
					datasOrdenadas.map(data => (
						<div key={data} className="grupo-data">
							<h3>{data}</h3>
							<ul className="lista-lembretes">
								{lembretes[data].map(lembrete => (
									<li key={lembrete.id}>
										<span>{lembrete.nome}</span>
										<button onClick={() => handleDeletarLembrete(data, lembrete.id)} className="botao-deletar">
											&#10060;
										</button>
									</li>
								))}
							</ul>
						</div>
					))
				) : (
					<p>Nenhum lembrete adicionado ainda.</p>
				)}
			</div>
		</div>
	);
}

export default App;