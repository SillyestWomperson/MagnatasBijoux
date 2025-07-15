import React from 'react';
import '../css/FormMensagem.css';

function FormMensagem() {
  return (
    <div className="form-mensagem">
      <h2>MANDE UMA MENSAGEM</h2>
      <form>
        <input type="text" placeholder="Digite seu nome" />
        <input type="email" placeholder="Digite seu e-mail" />
        <input type="tel" placeholder="(00) 0000-0000" />
        <select>
          <option>Assunto</option>
          <option>Dúvida</option>
          <option>Problema</option>
          <option>Elogio</option>
        </select>
        <textarea placeholder="Digite sua mensagem"></textarea>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default FormMensagem;
