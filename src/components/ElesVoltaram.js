import React, { useState, useEffect } from "react";
import "../css/ElesVoltaram.css";

/* import Placeholder from "../assets/img/homepage/placeholder_produtos.png"; */

import Brinco1 from "../assets/img/homepage/brinco_1_voltaram.png";
import Brinco2 from "../assets/img/homepage/brinco_2_voltaram.png";
import Brinco3 from "../assets/img/homepage/brinco_3_voltaram.png";
import Brinco4 from "../assets/img/homepage/brinco_4_voltaram.png";
import Anel1 from "../assets/img/homepage/anel_1_voltaram.png";
import Anel2 from "../assets/img/homepage/anel_2_voltaram.png";
import Anel3 from "../assets/img/homepage/anel_3_voltaram.png";
import Anel4 from "../assets/img/homepage/anel_4_voltaram.png";
import Colar1 from "../assets/img/homepage/colar_1_voltaram.png";
import Colar2 from "../assets/img/homepage/colar_2_voltaram.png";
import Colar3 from "../assets/img/homepage/colar_3_voltaram.png";
import Colar4 from "../assets/img/homepage/colar_4_voltaram.png";
import Pulseira1 from "../assets/img/homepage/pulseira_1_voltaram.png";
import Pulseira2 from "../assets/img/homepage/pulseira_2_voltaram.png";
import Pulseira3 from "../assets/img/homepage/pulseira_3_voltaram.png";
import Pulseira4 from "../assets/img/homepage/pulseira_4_voltaram.png";

const todosOsProdutos = [
	{ id: 1, category: "Brincos", image: Brinco1, link: "/produto/1" },
	{ id: 2, category: "Brincos", image: Brinco2, link: "/produto/2" },
	{ id: 3, category: "Brincos", image: Brinco3, link: "/produto/3" },
	{ id: 4, category: "Brincos", image: Brinco4, link: "/produto/4" },
	{ id: 5, category: "Anéis", image: Anel1, link: "/produto/5" },
	{ id: 6, category: "Anéis", image: Anel2, link: "/produto/6" },
	{ id: 7, category: "Anéis", image: Anel3, link: "/produto/7" },
	{ id: 8, category: "Anéis", image: Anel4, link: "/produto/8" },
	{ id: 9, category: "Colares", image: Colar1, link: "/produto/9" },
	{ id: 10, category: "Colares", image: Colar2, link: "/produto/10" },
	{ id: 11, category: "Colares", image: Colar3, link: "/produto/11" },
	{ id: 12, category: "Colares", image: Colar4, link: "/produto/12" },
	{ id: 13, category: "Pulseira", image: Pulseira1, link: "/produto/13" },
	{ id: 14, category: "Pulseira", image: Pulseira2, link: "/produto/14" },
	{ id: 15, category: "Pulseira", image: Pulseira3, link: "/produto/15" },
	{ id: 16, category: "Pulseira", image: Pulseira4, link: "/produto/16" },
];

const categories = ["Brincos", "Anéis", "Colares", "Pulseira", "Todos"];

const ElesVoltaram = () => {
	const [activeCategory, setActiveCategory] = useState(categories[0]);
	const [produtosVisiveis, setProdutosVisiveis] = useState([]);
	const [animationClass, setAnimationClass] = useState("slide-in-from-right");
	const [previousIndex, setPreviousIndex] = useState(0);

	const handleCategoryClick = (category, newIndex) => {
		if (newIndex === previousIndex) return;

		const direction = newIndex > previousIndex ? "left" : "right";
		setAnimationClass(`slide-out-to-${direction}`);

		setTimeout(() => {
			setActiveCategory(category);
			setPreviousIndex(newIndex);
			setAnimationClass(`slide-in-from-${direction === "left" ? "right" : "left"}`);
		}, 300);
	};

	useEffect(() => {
		let items;
		if (activeCategory === "Todos") {
			items = todosOsProdutos;
		} else {
			items = todosOsProdutos.filter((p) => p.category === activeCategory).slice(0, 4);
		}
		setProdutosVisiveis(items);
	}, [activeCategory]);

	return (
		<section className="eles-voltaram-section">
			<div className="eles-voltaram-top-bar">
				<div className="eles-voltaram-header">
					<h2>Eles Voltaram</h2>
					<p>Ícones Maria Dolores, releituras únicas, novas pedras e o mesmo design atemporal.</p>
				</div>
				<nav className="categorias-nav">
					{categories.map((cat, index) => (
						<button
							key={cat}
							className={`categoria-btn ${activeCategory === cat ? "active" : ""}`}
							onClick={() => handleCategoryClick(cat, index)}
						>
							{cat}
						</button>
					))}
				</nav>
			</div>

			<div className="produtos-container">
				<div className={`produtos-grid ${animationClass}`}>
					{produtosVisiveis.map((produto) => (
						<a href={produto.link} key={produto.id} className="produto-card">
							<img src={produto.image} alt={produto.category} />
						</a>
					))}
				</div>
			</div>
		</section>
	);
};

export default ElesVoltaram;
