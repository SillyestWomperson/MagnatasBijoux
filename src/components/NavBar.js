import "../css/NavBar.css";
import Logo from "../assets/img/logo.svg";

const NavBar = () => {
	return (
		<nav className="navbar-custom">
			<div className="navbar-container">
				<a href="/" className="navbar-brand">
					<img src={Logo} alt="Logo" className="navbar-logo" />
				</a>
				<div className="navbar-links">
					<a href="/new-collection" className="nav-link">
						NEW COLLECTION
					</a>
					<a href="/aneis" className="nav-link">
						ANÉIS
					</a>
					<a href="/colares" className="nav-link">
						COLARES
					</a>
					<a href="/brincos" className="nav-link">
						BRINCOS
					</a>
					<a href="/fale-conosco" className="nav-link">
						FALE CONOSCO
					</a>
					<a href="/sobre-nos" className="nav-link">
						SOBRE NÓS
					</a>
				</div>
				<div className="navbar-icons">
					<a href="#search" className="nav-icon">
						<i className="fas fa-search"></i>
					</a>
					<a href="#user" className="nav-icon">
						<i className="fas fa-user"></i>
					</a>
					<a href="#cart" className="nav-icon">
						<i className="fas fa-shopping-bag"></i>
					</a>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
