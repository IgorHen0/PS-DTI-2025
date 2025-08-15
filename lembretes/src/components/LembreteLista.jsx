import React from 'react';
import styles from '../App.module.css';

const LembreteLista = ({ datasOrdenadas, lembretes, onDeletar }) => {
    return (
        <div className={styles['lista-container']}>
            <h2>Lista de lembretes</h2>
            {datasOrdenadas.length > 0 ? (
                datasOrdenadas.map(data => (
                    <div key={data} className={styles['grupo-data']}>
                        <h3>{data}</h3>
                        <ul className={styles['lista-lembretes']}>
                            {lembretes[data].map(lembrete => (
                                <li key={lembrete.id}>
                                    <span>{lembrete.nome}</span>
                                    <button onClick={() => onDeletar(data, lembrete.id)} className={styles['botao-deletar']}>
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
    );
};

export default LembreteLista;