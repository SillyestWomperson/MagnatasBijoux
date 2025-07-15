import React from "react";
import "../css/SobreNosPage.css";
import Banner1 from "../assets/img/sobrenospage/sobrenos_banner1.png";
import Banner2 from "../assets/img/sobrenospage/sobrenos_banner2.png";

const SobreNosPage = () => {
	return (
		<div className="sobre-nos-page">
			<div className="top-gold-bar"></div>
			<div className="sobre-nos-container">
				<header className="sobre-nos-header">
					<div className="header-left">
						<h1 className="main-title">
							Expressão
							<br />
							Autêntica
						</h1>
						<p className="subtitle">UMA GÊNESE QUE INTEGRA PROPÓSITO E OUSADIA</p>
					</div>
					<div className="header-right">
						<p>
							Fundada em 2025, a Magnatas Bijoux é a expressão autêntica de arte e atitude no universo das
							bijuterias. Suas criações despertam emoções e trazem para o dia a dia da mulher um rico
							contexto cultural, através de coleções marcadas por traços únicos e memoráveis.
						</p>
						<p>
							Inspirada pelas mais diversas manifestações da natureza, do cotidiano, das relações e dos
							sentimentos, a Magnatas Bijoux transforma experiências em peças cheias de beleza e
							significado. Cada bijuteria carrega uma combinação inusitada de formas e elementos que
							contam histórias com estilo e personalidade.
						</p>
					</div>
				</header>

				<div className="banner-container">
					<img src={Banner1} alt="Modelo usando brinco Magnatas Bijoux" className="banner-image" />
				</div>

				<section className="sobre-nos-body">
					<div className="body-left">
						<p>
							Arte, moda e significado se unem nos traços autênticos da Magnatas Bijoux. Sua trajetória de
							crescimento tem permitido que cada vez mais mulheres se conectem com a marca em todo o
							Brasil – e além de suas fronteiras. Presente em todo o território nacional por meio do
							e-commerce, pontos de venda exclusivos e mais de 350 revendedoras autorizadas, a marca
							também conta com showrooms em Curitiba e São Paulo.
						</p>
						<p>
							Assim como a arte, a moda é a essência que nutre o universo da Magnatas Bijoux. Com um olhar
							atento às tendências e ao comportamento feminino, a marca está inserida no cenário fashion
							com uma identidade ousada, levando atitude e originalidade para diversos contextos. Suas
							criações refletem liberdade de expressão com uma estética marcante e contemporânea.
						</p>
					</div>
					<div className="body-right">
						<p>
							No exterior, o design da Magnatas Bijoux já conquistou espaços na Europa, América do Sul e
							América do Norte, com showroom na cidade de Miami. Essa presença global amplia o olhar
							criativo da marca e fortalece ainda mais a conexão com mulheres de diferentes culturas,
							estilos e histórias.
						</p>
						<p>
							Além das coleções autorais, a Magnatas Bijoux também assina colaborações com marcas
							brasileiras renomadas e já esteve presente em importantes eventos do setor, como o São Paulo
							Fashion Week (SPFW). Suas peças se destacam pelo design exclusivo, criatividade e expressão
							única, conquistando cada vez mais espaço dentro e fora do Brasil.
						</p>
					</div>
				</section>

				<div className="banner-container">
					<img src={Banner2} alt="Colar com pingente de pedra Magnatas Bijoux" className="banner-image" />
				</div>
			</div>
		</div>
	);
};

export default SobreNosPage;
