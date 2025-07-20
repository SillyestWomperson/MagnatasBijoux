import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/ProfilePage.css";
import { useAuth } from "../context/AuthContext";
import DefaultProfilePic from "../assets/img/logo-white.svg";

const ProfilePage = () => {
	const { user, isAuthenticated, logout, updateUser, isLoadingAuth } = useAuth();
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");

	const [isEditingProfile, setIsEditingProfile] = useState(false);
	const [editName, setEditName] = useState("");
	const [editSurname, setEditSurname] = useState("");
	const [editProfilePicURL, setEditProfilePicURL] = useState("");
	const [editProfileError, setEditProfileError] = useState("");
	const [isSavingProfile, setIsSavingProfile] = useState(false);

	const [isChangingPassword, setIsChangingPassword] = useState(false);
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");
	const [changePasswordError, setChangePasswordError] = useState("");
	const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

	const [isDeletingAccount, setIsDeletingAccount] = useState(false);
	const [deleteConfirmPassword, setDeleteConfirmPassword] = useState("");
	const [deleteAccountError, setDeleteAccountError] = useState("");
	const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

	useEffect(() => {
		if (isLoadingAuth) {
			return;
		}

		if (!isAuthenticated) {
			navigate("/login");
			return;
		}
		if (user) {
			setEditName(user.name || "");
			setEditSurname(user.surname || "");
			setEditProfilePicURL(user.profilePicURL || "");
			setIsLoading(false);
		} else {
			setIsLoading(false);
			setError("Dados do usuário não disponíveis. Tente recarregar a página.");
		}
	}, [isAuthenticated, user, navigate, isLoadingAuth]);

	const resetEditStates = () => {
		setIsEditingProfile(false);
		setEditProfileError("");
		setIsSavingProfile(false);

		setIsChangingPassword(false);
		setCurrentPassword("");
		setNewPassword("");
		setConfirmNewPassword("");
		setChangePasswordError("");
		setIsUpdatingPassword(false);

		setIsDeletingAccount(false);
		setDeleteConfirmPassword("");
		setDeleteAccountError("");
		setIsConfirmingDelete(false);
	};

	const handleEditProfileSubmit = async (e) => {
		e.preventDefault();
		setEditProfileError("");
		setIsSavingProfile(true);

		const token = localStorage.getItem("token");
		if (!token) {
			logout();
			return;
		}

		const updatedFields = {};
		if (editName !== user.name) {
			updatedFields.name = editName;
		}
		if (editSurname !== user.surname) {
			updatedFields.surname = editSurname;
		}
		if (editProfilePicURL !== user.profilePicURL) {
			updatedFields.profilePicURL = editProfilePicURL;
		}

		if (Object.keys(updatedFields).length === 0) {
			setEditProfileError("Nenhuma alteração detectada.");
			setIsSavingProfile(false);
			return;
		}

		try {
			const response = await fetch("https://magnatas-bijoux-server.vercel.app/api/users/update", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(updatedFields),
			});

			const data = await response.json();

			if (response.ok) {
				updateUser(data.user);
				resetEditStates();
			} else {
				setEditProfileError(data.message || "Erro ao atualizar perfil.");
				if (response.status === 401 || response.status === 403) {
					logout();
				}
			}
		} catch (err) {
			setEditProfileError("Erro ao conectar com o servidor para atualizar perfil.");
		} finally {
			setIsSavingProfile(false);
		}
	};

	const handleChangePasswordSubmit = async (e) => {
		e.preventDefault();
		setChangePasswordError("");
		setIsUpdatingPassword(true);

		const token = localStorage.getItem("token");
		if (!token) {
			logout();
			return;
		}

		if (!currentPassword || !newPassword || !confirmNewPassword) {
			setChangePasswordError("Por favor, preencha todos os campos.");
			setIsUpdatingPassword(false);
			return;
		}

		if (newPassword !== confirmNewPassword) {
			setChangePasswordError("A nova senha e a confirmação não coincidem.");
			setIsUpdatingPassword(false);
			return;
		}

		if (newPassword.length < 6) {
			setChangePasswordError("A nova senha deve ter no mínimo 6 caracteres.");
			setIsUpdatingPassword(false);
			return;
		}

		try {
			const response = await fetch("https://magnatas-bijoux-server.vercel.app/api/auth/change-password", {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					currentPassword,
					newPassword,
				}),
			});

			const data = await response.json();

			if (response.ok) {
				resetEditStates();
			} else {
				setChangePasswordError(data.message || "Erro ao mudar a senha.");
				if (response.status === 401 || response.status === 403) {
					logout();
				}
			}
		} catch (err) {
			setChangePasswordError("Erro ao conectar com o servidor para mudar a senha.");
		} finally {
			setIsUpdatingPassword(false);
		}
	};

	const handleDeleteAccount = async () => {
		setDeleteAccountError("");
		setIsConfirmingDelete(true);

		const token = localStorage.getItem("token");
		if (!token) {
			logout();
			return;
		}

		if (!deleteConfirmPassword) {
			setDeleteAccountError("Por favor, digite sua senha para confirmar.");
			setIsConfirmingDelete(false);
			return;
		}

		try {
			const response = await fetch("https://magnatas-bijoux-server.vercel.app/api/auth/delete", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ password: deleteConfirmPassword }),
			});

			const data = await response.json();

			if (response.ok) {
				logout();
			} else {
				setDeleteAccountError(data.message || "Erro ao excluir conta.");
				if (response.status === 401 || response.status === 403) {
					logout();
				}
			}
		} catch (err) {
			setDeleteAccountError("Erro ao conectar com o servidor para excluir conta.");
		} finally {
			setIsConfirmingDelete(false);
		}
	};

	if (isLoading || isLoadingAuth) {
		return (
			<div className="profile-page-container loading-state">
				<p>Carregando dados do perfil...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="profile-page-container error-state">
				<p className="error-message">{error}</p>
				<button onClick={logout} className="profile-button">
					Voltar para o Login
				</button>
			</div>
		);
	}

	if (!isAuthenticated || !user) {
		return (
			<div className="profile-page-container error-state">
				<p className="error-message">
					Você não está logado ou seus dados não foram carregados. Redirecionando...
				</p>
			</div>
		);
	}

	return (
		<div className="profile-page-container">
			<div className="profile-grid-container">
				<div className="profile-info-column">
					<div className="profile-header-section">
						<img
							src={user.profilePicURL || DefaultProfilePic}
							alt="Foto de Perfil"
							className="profile-pic"
						/>
						<h1 className="profile-name">
							{user.name} {user.surname}
						</h1>
						<p className="profile-email">{user.email}</p>
					</div>

					<div className="profile-actions-section">
						<button onClick={logout} className="profile-button logout-button">
							Sair da Conta
						</button>
					</div>
				</div>

				<div className="profile-forms-column">
					<div className="profile-section">
						<h2 className="section-title">Editar Informações Pessoais</h2>
						<button
							onClick={() => {
								resetEditStates();
								setIsEditingProfile(!isEditingProfile);
							}}
							className="profile-action-button"
						>
							{isEditingProfile ? "Cancelar Edição" : "Editar Perfil"}
						</button>

						{isEditingProfile && (
							<form className="profile-form" onSubmit={handleEditProfileSubmit}>
								<input
									type="text"
									placeholder="Novo Nome"
									value={editName}
									onChange={(e) => setEditName(e.target.value)}
									disabled={isSavingProfile}
								/>
								<input
									type="text"
									placeholder="Novo Sobrenome"
									value={editSurname}
									onChange={(e) => setEditSurname(e.target.value)}
									disabled={isSavingProfile}
								/>
								<input
									type="text"
									placeholder="URL da Foto de Perfil"
									value={editProfilePicURL}
									onChange={(e) => setEditProfilePicURL(e.target.value)}
									disabled={isSavingProfile}
								/>
								{editProfileError && <p className="error-message">{editProfileError}</p>}
								<button
									type="submit"
									className="profile-button submit-button"
									disabled={isSavingProfile}
								>
									{isSavingProfile ? "Salvando..." : "Salvar Alterações"}
								</button>
							</form>
						)}
					</div>

					<div className="profile-section">
						<h2 className="section-title">Alterar Senha</h2>
						<button
							onClick={() => {
								resetEditStates();
								setIsChangingPassword(!isChangingPassword);
							}}
							className="profile-action-button"
						>
							{isChangingPassword ? "Cancelar" : "Mudar Senha"}
						</button>

						{isChangingPassword && (
							<form className="profile-form" onSubmit={handleChangePasswordSubmit}>
								<input
									type="password"
									placeholder="Senha Atual"
									value={currentPassword}
									onChange={(e) => setCurrentPassword(e.target.value)}
									disabled={isUpdatingPassword}
								/>
								<input
									type="password"
									placeholder="Nova Senha"
									value={newPassword}
									onChange={(e) => setNewPassword(e.target.value)}
									disabled={isUpdatingPassword}
								/>
								<input
									type="password"
									placeholder="Confirmar Nova Senha"
									value={confirmNewPassword}
									onChange={(e) => setConfirmNewPassword(e.target.value)}
									disabled={isUpdatingPassword}
								/>
								{changePasswordError && <p className="error-message">{changePasswordError}</p>}
								<button
									type="submit"
									className="profile-button submit-button"
									disabled={isUpdatingPassword}
								>
									{isUpdatingPassword ? "Atualizando..." : "Atualizar Senha"}
								</button>
							</form>
						)}
					</div>

					<div className="profile-section delete-account-section">
						<h2 className="section-title">Gerenciamento da Conta</h2>
						<button
							onClick={() => {
								resetEditStates();
								setIsDeletingAccount(!isDeletingAccount);
							}}
							className="profile-action-button delete-button"
						>
							{isDeletingAccount ? "Cancelar Exclusão" : "Excluir Conta"}
						</button>

						{isDeletingAccount && (
							<div className="delete-confirmation-form">
								<p className="warning-message">
									Atenção: A exclusão da conta é irreversível. Por favor, digite sua senha para
									confirmar.
								</p>
								<input
									type="password"
									placeholder="Digite sua senha para confirmar"
									value={deleteConfirmPassword}
									onChange={(e) => setDeleteConfirmPassword(e.target.value)}
									disabled={isConfirmingDelete}
								/>
								{deleteAccountError && <p className="error-message">{deleteAccountError}</p>}
								<button
									onClick={handleDeleteAccount}
									className="profile-button confirm-delete-button"
									disabled={isConfirmingDelete}
								>
									{isConfirmingDelete ? "Excluindo..." : "Confirmar Exclusão"}
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
