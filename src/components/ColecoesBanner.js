import React from 'react';
import { Container } from 'react-bootstrap';
import '../css/ColecoesBanner.css';

import Banner from '../assets/img/colecoespage/banner_colecoes.png'

const ColecoesBanner = () => {
  return (
    <div className="banner-colecoes">
      <Container fluid className="p-0">
        <img
          src={Banner}
          alt="Banner Coleções"
          className="img-fluid w-100"
        />
      </Container>
    </div>
  );
};

export default ColecoesBanner;
