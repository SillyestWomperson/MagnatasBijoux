import { Link } from "react-router-dom";
import "../css/Footer.css";
import Logo from "../assets/img/logo-white.svg";

const Footer = () => {
	return (
		<footer className="footer-section">
			<div className="footer-container">
				<div className="footer-top">
					<div className="footer-column about">
						<img src={Logo} alt="Magnatas Bijoux" className="footer-logo" />
						<p>Um convite para você sentir a vida pulsar. Peças únicas com design atemporal.</p>
					</div>
					<div className="footer-column links">
						<h4>Institucional</h4>
						<ul>
							<li>
								<Link to="/sobre-nos">Sobre Nós</Link>
							</li>
							<li>
								<Link to="/new-collection">Coleções</Link>
							</li>
							<li>
								<Link to="/contato">Fale Conosco</Link>
							</li>
							<li>
								<Link to="/faq">FAQ</Link>
							</li>
						</ul>
					</div>
					<div className="footer-column links">
						<h4>Ajuda</h4>
						<ul>
							<li>
								<Link to="/envio">Envio e Entregas</Link>
							</li>
							<li>
								<Link to="/trocas">Trocas e Devoluções</Link>
							</li>
							<li>
								<Link to="/privacidade">Política de Privacidade</Link>
							</li>
							<li>
								<Link to="/termos">Termos de Uso</Link>
							</li>
						</ul>
					</div>
					<div className="footer-column newsletter">
						<h4>Newsletter</h4>
						<p>Receba novidades e promoções exclusivas em primeira mão.</p>
						<form className="newsletter-form">
							<input type="email" placeholder="Seu melhor e-mail" />
							<button type="submit">Inscrever</button>
						</form>
					</div>
				</div>
				<div className="footer-bottom">
					<p className="copyright">
						© {new Date().getFullYear()} Magnatas Bijoux. Todos os direitos reservados.
					</p>
					<div className="social-icons">
						<a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
							<i className="fab fa-instagram"></i>
						</a>
						<a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
							<i className="fab fa-facebook-f"></i>
						</a>
						<a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
							<i className="fab fa-pinterest-p"></i>
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
