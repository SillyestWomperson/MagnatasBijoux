import React from 'react';
import imagemFaleConosco from '../assets/img/imagemFaleConosco/imagemFaleConosco.png';
import '../css/FaleConoscoBackground.css';

function FaleConoscoBackground() {
  return (
    <div className="fale-conosco-background">
      <div className="fale-texto">
        <h2>FALE CONOSCO</h2>
        <p>Em caso de dúvida ou sugestão, entre em contato.</p>

        <div className="bloco">
          <h3>PRECISA DE ATENDIMENTO?</h3>
          <p><i className="fas fa-phone-alt"></i> +55 41 9999-9999 <span>seg à sex das 9h às 18h</span></p>
          <p><i className="fas fa-envelope"></i> shop@magnatasbijoux.com.br</p>
        </div>

        <div className="bloco">
          <h3>QUER RESOLVER UM PROBLEMA?</h3>
          <p><i className="fas fa-phone-alt"></i> +55 41 3027-9251 <span>seg à sex das 10h às 17h</span></p>
          <p><i className="fas fa-envelope"></i> contato@magnatasbijoux.com.br</p>
        </div>

        <div className="links-uteis">
          <h3>LINKS ÚTEIS</h3>
          <ul>
            <li><i className="fas fa-store"></i> Nossas Lojas</li>
            <li><i className="fas fa-question-circle"></i> Perguntas Frequentes</li>
            <li><i className="fas fa-exchange-alt"></i> Trocas e Devoluções</li>
          </ul>
        </div>
      </div>

      <div className="imagem-lateral">
        <img src={imagemFaleConosco} alt="Imagem Fale Conosco" />
      </div>
    </div>
  );
}

export default FaleConoscoBackground;
