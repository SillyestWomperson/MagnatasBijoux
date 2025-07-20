import React from "react";
import { Link } from "react-router-dom";
import "../css/NavBar.css";
import Logo from "../assets/img/logo.svg";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
	const { isAuthenticated } = useAuth();

	return (
		<nav className="navbar-custom">
			<div className="navbar-container">
				<Link to="/" className="navbar-brand">
					<img src={Logo} alt="Logo" className="navbar-logo" />
				</Link>
				<div className="navbar-links">
					<Link to="/new-collection" className="nav-link">
						NEW COLLECTION
					</Link>
					<Link to="/aneis" className="nav-link">
						ANÉIS
					</Link>
					<Link to="/colares" className="nav-link">
						COLARES
					</Link>
					<Link to="/brincos" className="nav-link">
						BRINCOS
					</Link>
					<Link to="/contato" className="nav-link">
						FALE CONOSCO
					</Link>
					<Link to="/sobre-nos" className="nav-link">
						SOBRE NÓS
					</Link>
				</div>
				<div className="navbar-icons">
					<a href="#search" className="nav-icon">
						<i className="fas fa-search"></i>
					</a>
					<Link to={isAuthenticated ? "/me" : "/login"} className="nav-icon">
						<i className="fas fa-user"></i>
					</Link>
					<Link to="/cart" className="nav-icon">
						<i className="fas fa-shopping-bag"></i>
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
