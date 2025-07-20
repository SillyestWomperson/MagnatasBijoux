import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/img/logo-white.svg";
import "../css/AuthPage.css";
import { useAuth } from "../context/AuthContext";

const AuthPage = () => {
	const location = useLocation();
	const { login: authLogin } = useAuth();

	const [isLoginMode, setIsLoginMode] = useState(location.pathname === "/login");

	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	const [loginEmailError, setLoginEmailError] = useState("");
	const [loginFormError, setLoginFormError] = useState("");
	const [isLoadingLogin, setIsLoadingLogin] = useState(false);

	const [registerName, setRegisterName] = useState("");
	const [registerSurname, setRegisterSurname] = useState("");
	const [registerEmail, setRegisterEmail] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");
	const [registerEmailError, setRegisterEmailError] = useState("");
	const [termsAccepted, setTermsAccepted] = useState(false);
	const [termsError, setTermsError] = useState("");
	const [registerFormError, setRegisterFormError] = useState("");
	const [isLoadingRegister, setIsLoadingRegister] = useState(false);

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	useEffect(() => {
		clearAllFormStates();
		setIsLoginMode(location.pathname === "/login");
	}, [location.pathname]);

	const clearAllFormStates = () => {
		setLoginEmail("");
		setLoginPassword("");
		setLoginEmailError("");
		setLoginFormError("");
		setIsLoadingLogin(false);

		setRegisterName("");
		setRegisterSurname("");
		setRegisterEmail("");
		setRegisterPassword("");
		setRegisterEmailError("");
		setTermsAccepted(false);
		setTermsError("");
		setRegisterFormError("");
		setIsLoadingRegister(false);
	};

	const validateEmail = (email, setErrorState) => {
		if (!email) {
			setErrorState("O e-mail é obrigatório.");
			return false;
		}
		if (!emailRegex.test(email)) {
			setErrorState("Por favor, insira um e-mail válido.");
			return false;
		}
		setErrorState("");
		return true;
	};

	const handleLoginEmailChange = (e) => {
		setLoginEmail(e.target.value);
		validateEmail(e.target.value, setLoginEmailError);
		setLoginFormError("");
	};

	const handleLoginPasswordChange = (e) => {
		setLoginPassword(e.target.value);
		setLoginFormError("");
	};

	const handleRegisterNameChange = (e) => {
		setRegisterName(e.target.value);
		setRegisterFormError("");
	};

	const handleRegisterSurnameChange = (e) => {
		setRegisterSurname(e.target.value);
		setRegisterFormError("");
	};

	const handleRegisterEmailChange = (e) => {
		setRegisterEmail(e.target.value);
		validateEmail(e.target.value, setRegisterEmailError);
		setRegisterFormError("");
	};

	const handleRegisterPasswordChange = (e) => {
		setRegisterPassword(e.target.value);
		setRegisterFormError("");
	};

	const handleTermsChange = (e) => {
		setTermsAccepted(e.target.checked);
		setTermsError("");
		setRegisterFormError("");
	};

	const handleTabClick = (mode) => {
		clearAllFormStates();
		setIsLoginMode(mode);
	};

	const handleLoginSubmit = async (e) => {
		e.preventDefault();
		setLoginFormError("");
		setIsLoadingLogin(true);

		if (!loginEmail || !loginPassword) {
			setLoginFormError("Por favor, preencha todos os campos.");
			setIsLoadingLogin(false);
			return;
		}

		const isEmailValid = validateEmail(loginEmail, setLoginEmailError);
		if (!isEmailValid) {
			setIsLoadingLogin(false);
			return;
		}

		try {
			const response = await fetch("https://magnatas-bijoux-server.vercel.app/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email: loginEmail, password: loginPassword }),
			});

			const data = await response.json();

			if (response.ok) {
				console.log("Login bem-sucedido:", data);
				authLogin(data.token, data.user);
			} else {
				console.error("Erro no login:", data.message);
				setLoginFormError(data.message || "Erro desconhecido ao fazer login.");
			}
		} catch (error) {
			console.error("Erro ao conectar com a API de login:", error);
			setLoginFormError("Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.");
		} finally {
			setIsLoadingLogin(false);
		}
	};

	const handleRegisterSubmit = async (e) => {
		e.preventDefault();
		setRegisterFormError("");
		setTermsError("");
		setIsLoadingRegister(true);

		if (!registerName || !registerSurname || !registerEmail || !registerPassword) {
			setRegisterFormError("Por favor, preencha todos os campos obrigatórios.");
			setIsLoadingRegister(false);
			return;
		}

		const isEmailValid = validateEmail(registerEmail, setRegisterEmailError);
		if (!isEmailValid) {
			setIsLoadingRegister(false);
			return;
		}

		if (!termsAccepted) {
			setTermsError("Você deve aceitar os termos de serviço para criar uma conta.");
			setIsLoadingRegister(false);
			return;
		}

		try {
			const response = await fetch("https://magnatas-bijoux-server.vercel.app/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: registerName,
					surname: registerSurname,
					email: registerEmail,
					password: registerPassword,
				}),
			});

			const data = await response.json();

			if (response.ok) {
				console.log("Registro bem-sucedido:", data);
				setRegisterName("");
				setRegisterSurname("");
				setRegisterEmail("");
				setRegisterPassword("");
				setTermsAccepted(false);
				setRegisterEmailError("");
				setTermsError("");
				setRegisterFormError("");
				setIsLoginMode(true);
			} else {
				console.error("Erro no registro:", data.message);
				setRegisterFormError(data.message || "Erro desconhecido ao registrar.");
			}
		} catch (error) {
			console.error("Erro ao conectar com a API de registro:", error);
			setRegisterFormError("Ocorreu um erro ao tentar registrar. Tente novamente mais tarde.");
		} finally {
			setIsLoadingRegister(false);
		}
	};

	return (
		<div className="auth-page-container">
			<div className="auth-form-wrapper">
				<div className="auth-tabs">
					<button
						className={`auth-tab-button ${isLoginMode ? "active" : ""}`}
						onClick={() => handleTabClick(true)}
					>
						LOGIN
					</button>
					<button
						className={`auth-tab-button ${!isLoginMode ? "active" : ""}`}
						onClick={() => handleTabClick(false)}
					>
						CADASTRE-SE
					</button>
				</div>

				<div className="auth-content">
					<Link to="/">
						<img src={Logo} alt="Magnatas Bijoux" className="auth-logo" />
					</Link>
					<h1 className="auth-title">{isLoginMode ? "Acessar Sua Conta" : "Crie Sua Conta"}</h1>

					{isLoginMode ? (
						<form className="auth-form" onSubmit={handleLoginSubmit}>
							<input
								type="email"
								name="email"
								placeholder="Seu e-mail"
								value={loginEmail}
								onChange={handleLoginEmailChange}
								required
								disabled={isLoadingLogin}
							/>
							{loginEmailError && <p className="error-message">{loginEmailError}</p>}
							<input
								type="password"
								name="password"
								placeholder="Sua senha"
								value={loginPassword}
								onChange={handleLoginPasswordChange}
								required
								disabled={isLoadingLogin}
							/>
							{loginFormError && <p className="error-message">{loginFormError}</p>}
							<button type="submit" className="auth-submit-button" disabled={isLoadingLogin}>
								{isLoadingLogin ? "Entrando..." : "Entrar"}
							</button>
						</form>
					) : (
						<form className="auth-form" onSubmit={handleRegisterSubmit}>
							<div className="auth-form-row">
								<input
									type="text"
									name="name"
									placeholder="Nome"
									value={registerName}
									onChange={handleRegisterNameChange}
									required
									disabled={isLoadingRegister}
								/>
								<input
									type="text"
									name="surname"
									placeholder="Sobrenome"
									value={registerSurname}
									onChange={handleRegisterSurnameChange}
									required
									disabled={isLoadingRegister}
								/>
							</div>
							<input
								type="email"
								name="email"
								placeholder="E-mail"
								value={registerEmail}
								onChange={handleRegisterEmailChange}
								required
								disabled={isLoadingRegister}
							/>
							{registerEmailError && <p className="error-message">{registerEmailError}</p>}
							<input
								type="password"
								name="password"
								placeholder="Crie uma senha"
								value={registerPassword}
								onChange={handleRegisterPasswordChange}
								required
								disabled={isLoadingRegister}
							/>
							<div className="terms-checkbox-container">
								<input
									type="checkbox"
									id="terms"
									checked={termsAccepted}
									onChange={handleTermsChange}
									disabled={isLoadingRegister}
								/>
								<label htmlFor="terms">
									Eu li e aceito os{" "}
									<Link to="/termos" className="terms-link">
										termos de serviço
									</Link>
								</label>
							</div>
							{termsError && <p className="error-message">{termsError}</p>}
							{registerFormError && <p className="error-message">{registerFormError}</p>}
							<button type="submit" className="auth-submit-button" disabled={isLoadingRegister}>
								{isLoadingRegister ? "Cadastrando..." : "Criar Conta"}
							</button>
						</form>
					)}
				</div>
			</div>
		</div>
	);
};

export default AuthPage;
