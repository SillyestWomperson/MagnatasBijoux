import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../css/ColecoesGrid.css';

import FlorSemAmor from '../assets/img/colecoespage/florSemAmor.png'
import Tempoesia from '../assets/img/colecoespage/tempoesia.png'
import IneditosJulho from '../assets/img/colecoespage/ineditos_Julho.png'
import Ritmo from '../assets/img/colecoespage/ritmo.png'
import Icones from '../assets/img/colecoespage/icones.png'
import Trajetos from '../assets/img/colecoespage/trajetos.png'

const colecoes = [
  { nome: 'FLOR SEM AMOR', imagem: FlorSemAmor },
  { nome: 'TEMPOESIA', imagem: Tempoesia },
  { nome: 'INÉDITOS JULHO', imagem: IneditosJulho },
  { nome: 'RITMO', imagem: Ritmo },
  { nome: 'ÍCONES', imagem: Icones },
  { nome: 'TRAJETOS', imagem: Trajetos }
];

const ColecoesGrid = () => {
  return (
    <div className="colecoes-section">
      <Container>
        <h5 className="titulo-secao">HOME | COLEÇÕES</h5>
        <Row>
          {colecoes.map((colecao, index) => (
            <Col key={index} xs={12} sm={6} md={4} className="mb-4">
              <Card className="colecao-card">
                <Card.Img variant="top" src={colecao.imagem} />
                <Card.Body className="card-footer-custom">
                  <Card.Text className="nome-colecao">{colecao.nome}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default ColecoesGrid;
