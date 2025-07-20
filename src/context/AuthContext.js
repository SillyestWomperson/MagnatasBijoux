import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoadingAuth, setIsLoadingAuth] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const storedToken = localStorage.getItem("token");
		const storedUser = localStorage.getItem("user");

		if (storedToken && storedUser) {
			try {
				const parsedUser = JSON.parse(storedUser);
				setToken(storedToken);
				setUser(parsedUser);
				setIsAuthenticated(true);
			} catch (e) {
				localStorage.removeItem("token");
				localStorage.removeItem("user");
				setToken(null);
				setUser(null);
				setIsAuthenticated(false);
			}
		} else {
			setToken(null);
			setUser(null);
			setIsAuthenticated(false);
		}
		setIsLoadingAuth(false);
	}, []);

	const login = (newToken, newUser) => {
		localStorage.setItem("token", newToken);
		localStorage.setItem("user", JSON.stringify(newUser));
		setToken(newToken);
		setUser(newUser);
		setIsAuthenticated(true);
		navigate("/me");
	};

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		setToken(null);
		setUser(null);
		setIsAuthenticated(false);
		navigate("/login");
	};

	const updateUser = (updatedUserData) => {
		localStorage.setItem("user", JSON.stringify(updatedUserData));
		setUser(updatedUserData);
	};

	const authContextValue = {
		user,
		token,
		isAuthenticated,
		isLoadingAuth,
		login,
		logout,
		updateUser,
	};

	return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth deve ser usado dentro de um AuthProvider");
	}
	return context;
};
