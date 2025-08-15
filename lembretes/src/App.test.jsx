import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('Renderiza o componente App', () => {
    render(<App />);
    expect(screen.getByText('Novo lembrete')).toBeInTheDocument();
    expect(screen.getByText('Lista de lembretes')).toBeInTheDocument();
  });

  test('Adiciona um novo lembrete', () => {
    render(<App />);
    
    fireEvent.change(screen.getByPlaceholderText('Nome do lembrete'), {
      target: { value: 'Comprar pão' },
    });
    fireEvent.change(screen.getByPlaceholderText('Data do lembrete (no formato dd/mm/yyyy)'), {
      target: { value: '16/08/2025' },
    });
    fireEvent.click(screen.getByText('Criar'));
    
    expect(screen.getByText('Comprar pão')).toBeInTheDocument();
    expect(screen.getByText('16/08/2025')).toBeInTheDocument();
  });

  test('Mostra mensagem de erro para nome vazio', () => {
    render(<App />);
    
    fireEvent.click(screen.getByText('Criar'));
    
    expect(screen.getByText('O campo "Nome" é obrigatório.')).toBeInTheDocument();
  });

  test('Mostra mensagem de erro para data vazia', () => {
    render(<App />);
    
    fireEvent.change(screen.getByPlaceholderText('Nome do lembrete'), {
      target: { value: 'Comprar pão' },
    });
    fireEvent.click(screen.getByText('Criar'));
    
    expect(screen.getByText('O campo "Data" é obrigatório.')).toBeInTheDocument();
  });

  test('Mostra mensagem de erro para data no passado', () => {
    render(<App />);
    
    fireEvent.change(screen.getByPlaceholderText('Nome do lembrete'), {
      target: { value: 'Comprar pão' },
    });
    fireEvent.change(screen.getByPlaceholderText('Data do lembrete (no formato dd/mm/yyyy)'), {
      target: { value: '01/01/2020' },
    });
    fireEvent.click(screen.getByText('Criar'));
    
    expect(screen.getByText('A data deve ser no futuro.')).toBeInTheDocument();
  });

  test('Deleta um lembrete', () => {
    render(<App />);
    
    fireEvent.change(screen.getByPlaceholderText('Nome do lembrete'), {
      target: { value: 'Comprar pão' },
    });
    fireEvent.change(screen.getByPlaceholderText('Data do lembrete (no formato dd/mm/yyyy)'), {
      target: { value: '16/08/2025' },
    });
    fireEvent.click(screen.getByText('Criar'));
    
    const deleteButton = screen.getByText('❌');
    fireEvent.click(deleteButton);
    
    expect(screen.queryByText('Comprar pão')).not.toBeInTheDocument();
  });
});