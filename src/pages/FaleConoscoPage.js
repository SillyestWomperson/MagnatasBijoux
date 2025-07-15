import React from 'react';
import FaleConoscoBackground from '../components/FaleConoscoBackground';
import FormMensagem from '../components/FormMensagem';
import '../css/FaleConoscoPage.css';

function FaleConoscoPage() {
  return (
    <div className="fale-conosco-section">
      <FaleConoscoBackground />
      <FormMensagem />
    </div>
  );
}

export default FaleConoscoPage;
