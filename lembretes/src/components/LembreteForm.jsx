import React from 'react';
import styles from '../App.module.css';

const LembreteForm = ({ nome, data, onNomeChange, onDataChange, onSubmit }) => {
    return (
        <form onSubmit={onSubmit} className={styles['form-lembrete']}>
            <div className={styles['form-grupo']}>
                <label htmlFor="nome">Nome</label>
                <input
                    id="nome"
                    type="text"
                    placeholder="Nome do lembrete"
                    value={nome}
                    onChange={onNomeChange}
                />
            </div>
            <div className={styles['form-grupo']}>
                <label htmlFor="data">Data</label>
                <input
                    id="data"
                    type="text"
                    placeholder="Data do lembrete (no formato dd/mm/yyyy)"
                    value={data}
                    onChange={onDataChange}
                />
            </div>
            <button type="submit">Criar</button>
        </form>
    );
};

export default LembreteForm;