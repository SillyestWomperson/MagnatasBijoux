import React from 'react';
import { Container } from 'react-bootstrap';
import '../css/ColecoesTextoFinal.css';

const ColecoesTextoFinal = () => {
  return (
    <div className="texto-final-section">
      <Container>
        <h2 className="titulo-final">COLEÇÕES MAGNATAS BIJOUX</h2>
        <hr className="linha-separadora" />
        <h5 className="subtitulo-final">JOIAS: EXPRESSÃO, ARTE E ESTILO</h5>
        <p className="paragrafo-final">
          As joias têm o poder de traduzir sentimentos, contar histórias e eternizar momentos
          refletindo a essência de quem as escolhe. Cada peça com seu brilho único revela um
          pouco do que somos e do que desejamos expressar. A marca vai além do conceito tradicional
          de joias. Com uma abordagem autoral, a marca cria peças envolventes e autênticas que se
          tornam extensões da personalidade de quem as usa. Continue nos acompanhando e descubra
          o que torna o essencial... extraordinário.
        </p>
      </Container>
    </div>
  );
};

export default ColecoesTextoFinal;
