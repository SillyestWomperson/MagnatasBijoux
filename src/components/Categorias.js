import "../css/Categorias.css";

import BrincosPromo from "../assets/img/homepage/brincos_promo.png";
import AnelPromo from "../assets/img/homepage/aneis_promo.png";
import PulseirasPromo from "../assets/img/homepage/pulseiras_promo.png";
import ColaresPromo from "../assets/img/homepage/colares_promo.png";

const Categorias = () => {
	return (
		<section className="categorias-section">
			<div className="categorias-header">
				<h2 className="categorias-title">Compre por Categorias</h2>
				<a href="/produtos" className="todos-produtos-link">
					Todos os produtos
				</a>
			</div>
			<div className="categorias-grid">
				<div className="categoria-item">
					<img src={BrincosPromo} alt="Brincos" />
					<div className="categoria-overlay">
						<h3>Brincos</h3>
					</div>
				</div>
				<div className="categoria-item">
					<img src={AnelPromo} alt="Anéis" />
					<div className="categoria-overlay">
						<h3>Anéis</h3>
					</div>
				</div>
				<div className="categoria-item">
					<img src={PulseirasPromo} alt="Pulseiras" />
					<div className="categoria-overlay">
						<h3>Pulseiras</h3>
					</div>
				</div>
				<div className="categoria-item">
					<img src={ColaresPromo} alt="Colares" />
					<div className="categoria-overlay">
						<h3>Colares</h3>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Categorias;
