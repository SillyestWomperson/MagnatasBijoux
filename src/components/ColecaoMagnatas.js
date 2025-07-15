import React from "react";
import { Link } from "react-router-dom";
import "../css/ColecaoMagnatas.css";
import Background from "../assets/img/homepage/magnatas_banner.png";
import Placeholder from "../assets/img/homepage/placeholder_magnatas.png";

const ColecaoMagnatas = () => {
	return (
		<section className="colecao-magnatas-section">
			<div className="magnatas-text-content">
				<h2 className="magnatas-title">MAGNATAS BIJOUX</h2>
				<p className="magnatas-subtitle">Um convite para você sentir a vida pulsar</p>
				<div className="magnatas-placeholders">
					<img src={Placeholder} alt="Placeholder" className="magnatas-placeholder" />
					<img src={Placeholder} alt="Placeholder" className="magnatas-placeholder" />
					<img src={Placeholder} alt="Placeholder" className="magnatas-placeholder" />
				</div>
				<Link to="/new-collection" className="explore-link">
					Explore a Coleção
				</Link>
			</div>
			<div
				className="magnatas-background-image"
				style={{
					backgroundImage: `url(${Background})`,
				}}
			></div>
		</section>
	);
};

export default ColecaoMagnatas;
