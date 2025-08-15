import React from 'react';
import styles from '../App.module.css';

const MensagemErro = ({ mensagem }) => {
    if (!mensagem) return null;
    return <p className={styles['mensagem-erro']}>{mensagem}</p>;
};

export default MensagemErro;