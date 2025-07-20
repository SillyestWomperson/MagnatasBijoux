import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/CartPage.css";
import { useAuth } from "../context/AuthContext";

const CartPage = () => {
	const { isAuthenticated, logout, isLoadingAuth } = useAuth();
	const navigate = useNavigate();

	const [cartItems, setCartItems] = useState([]);
	const [productsData, setProductsData] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");
	const [isUpdating, setIsUpdating] = useState(false);

	const fetchCartAndProductDetails = useCallback(async () => {
		setIsLoading(true);
		setError("");
		const token = localStorage.getItem("token");

		if (!token) {
			logout();
			return;
		}

		try {
			const cartResponse = await fetch("https://magnatas-bijoux-server.vercel.app/api/cart", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			const cartData = await cartResponse.json();

			if (!cartResponse.ok) {
				setError(cartData.message || "Erro ao carregar itens do carrinho.");
				if (cartResponse.status === 401 || cartResponse.status === 403) logout();
				return;
			}

			const itemsInCart = cartData.cart || [];
			setCartItems(itemsInCart);

			const uniqueProductIds = [...new Set(itemsInCart.map((item) => item.productId))];

			const fetchedProducts = {};
			if (uniqueProductIds.length > 0) {
				await Promise.all(
					uniqueProductIds.map(async (pId) => {
						const productResponse = await fetch(
							`https://magnatas-bijoux-server.vercel.app/api/products/${pId}`
						);
						const productData = await productResponse.json();
						if (productResponse.ok) {
							fetchedProducts[pId] = productData.product;
						} else {
							console.error(`Erro ao buscar detalhes do produto ${pId}:`, productData.message);
						}
					})
				);
			}
			setProductsData(fetchedProducts);
		} catch (err) {
			console.error("Erro ao buscar carrinho ou detalhes de produtos:", err);
			setError("Ocorreu um erro ao conectar com o servidor para carregar o carrinho ou produtos.");
		} finally {
			setIsLoading(false);
		}
	}, [logout]);

	useEffect(() => {
		if (isLoadingAuth) {
			return;
		}

		if (!isAuthenticated) {
			navigate("/login");
			return;
		}

		fetchCartAndProductDetails();
	}, [isAuthenticated, navigate, isLoadingAuth, fetchCartAndProductDetails]);

	const handleRemoveItem = useCallback(
		async (productId) => {
			setIsUpdating(true);
			setError("");
			const token = localStorage.getItem("token");

			if (!token) {
				logout();
				return;
			}

			try {
				const response = await fetch(`https://magnatas-bijoux-server.vercel.app/api/cart/${productId}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});

				const data = await response.json();

				if (response.ok) {
					setCartItems(cartItems.filter((item) => item.productId !== productId));
				} else {
					setError(data.message || "Erro ao remover item do carrinho.");
					if (response.status === 401 || response.status === 403) {
						logout();
					}
				}
			} catch (err) {
				console.error("Erro ao remover item do carrinho:", err);
				setError("Erro ao conectar com o servidor para remover item.");
			} finally {
				setIsUpdating(false);
			}
		},
		[cartItems, logout]
	);

	const handleUpdateAmount = useCallback(
		async (productId, newAmount) => {
			if (newAmount < 1) {
				handleRemoveItem(productId);
				return;
			}

			setIsUpdating(true);
			setError("");
			const token = localStorage.getItem("token");

			if (!token) {
				logout();
				return;
			}

			try {
				const response = await fetch("https://magnatas-bijoux-server.vercel.app/api/cart", {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ productId, amount: newAmount }),
				});

				const data = await response.json();

				if (response.ok) {
					setCartItems(
						cartItems.map((item) => (item.productId === productId ? { ...item, amount: newAmount } : item))
					);
				} else {
					setError(data.message || "Erro ao atualizar quantidade.");
					if (response.status === 401 || response.status === 403) {
						logout();
					}
				}
			} catch (err) {
				console.error("Erro ao atualizar quantidade:", err);
				setError("Erro ao conectar com o servidor para atualizar quantidade.");
			} finally {
				setIsUpdating(false);
			}
		},
		[cartItems, handleRemoveItem, logout]
	);

	const handleUpdateOption = useCallback(
		async (productId, currentSize, currentBathedType, newSize, newBathedType) => {
			setIsUpdating(true);
			setError("");
			const token = localStorage.getItem("token");

			if (!token) {
				logout();
				return;
			}

			if (currentSize === newSize && currentBathedType === newBathedType) {
				setIsUpdating(false);
				return;
			}

			try {
				const response = await fetch("https://magnatas-bijoux-server.vercel.app/api/cart", {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						productId,
						size: newSize,
						bathedType: newBathedType,
					}),
				});

				const data = await response.json();

				if (response.ok) {
					setCartItems(
						cartItems.map((item) =>
							item.productId === productId ? { ...item, size: newSize, bathedType: newBathedType } : item
						)
					);
				} else {
					setError(data.message || "Erro ao atualizar opção do item.");
					if (response.status === 401 || response.status === 403) {
						logout();
					}
				}
			} catch (err) {
				console.error("Erro ao atualizar opção do item:", err);
				setError("Erro ao conectar com o servidor para atualizar opção.");
			} finally {
				setIsUpdating(false);
			}
		},
		[cartItems, logout]
	);

	const handleCheckout = () => {
		console.log("Finalizando compra...");
		alert("Compra finalizada com sucesso (simulado)! Obrigado por comprar na Magnatas Bijoux.");
		navigate("/");
	};

	const calculateSubtotal = () => {
		return cartItems.reduce((total, item) => {
			const product = productsData[item.productId];
			return total + (product ? item.amount * product.price : 0);
		}, 0);
	};

	if (isLoadingAuth || isLoading) {
		return (
			<div className="cart-page-container loading-state">
				<p>Carregando seu carrinho...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="cart-page-container error-state">
				<p className="error-message">{error}</p>
				<button onClick={() => navigate("/")} className="cart-button">
					Voltar para a Home
				</button>
			</div>
		);
	}

	return (
		<div className="cart-page-container">
			<h1 className="cart-title">Seu Carrinho</h1>

			{cartItems.length === 0 ? (
				<div className="empty-cart">
					<p>Seu carrinho está vazio.</p>
					<Link to="/new-collection" className="continue-shopping-link">
						Continue Comprando
					</Link>
				</div>
			) : (
				<div className="cart-content-grid">
					<div className="cart-items-column">
						{cartItems.map((item) => {
							const product = productsData[item.productId];
							if (!product) {
								return (
									<div key={item.productId} className="cart-item-card missing-product">
										<img
											src={"/placeholder.svg"}
											alt="Produto não encontrado"
											className="cart-item-image"
										/>
										<div className="cart-item-details">
											<h3 className="cart-item-name">
												Produto não encontrado (ID: {item.productId})
											</h3>
											<p className="cart-item-meta">Quantidade: {item.amount}</p>
											<p className="cart-item-price">R$ --,--</p>
										</div>
										<button
											onClick={() => handleRemoveItem(item.productId)}
											className="cart-item-remove-button"
											disabled={isUpdating}
										>
											Remover
										</button>
									</div>
								);
							}
							return (
								<div key={item.productId} className="cart-item-card">
									<img
										src={product.imagesUrl[0] || "/placeholder.svg"}
										alt={product.name}
										className="cart-item-image"
									/>
									<div className="cart-item-details">
										<h3 className="cart-item-name">{product.name}</h3>
										<p className="cart-item-price">R$ {product.price.toFixed(2)}</p>
										<div className="cart-item-options">
											{product.sizesAvailable && product.sizesAvailable.length > 0 && (
												<select
													value={item.size || ""}
													onChange={(e) =>
														handleUpdateOption(
															item.productId,
															item.size,
															item.bathedType,
															e.target.value,
															item.bathedType
														)
													}
													disabled={isUpdating}
												>
													<option value="" disabled>
														Tamanho
													</option>
													{product.sizesAvailable.map((size) => (
														<option key={size} value={size}>
															{size}
														</option>
													))}
												</select>
											)}
											{product.bathedTypes && product.bathedTypes.length > 0 && (
												<select
													value={item.bathedType || ""}
													onChange={(e) =>
														handleUpdateOption(
															item.productId,
															item.size,
															item.bathedType,
															item.size,
															e.target.value
														)
													}
													disabled={isUpdating}
												>
													<option value="" disabled>
														Banho
													</option>
													{product.bathedTypes.map((bathedType) => (
														<option key={bathedType} value={bathedType}>
															{bathedType}
														</option>
													))}
												</select>
											)}
										</div>
									</div>
									<div className="cart-item-quantity-controls">
										<button
											onClick={() => handleUpdateAmount(item.productId, item.amount - 1)}
											disabled={isUpdating}
										>
											-
										</button>
										<span className="cart-item-amount">{item.amount}</span>
										<button
											onClick={() => handleUpdateAmount(item.productId, item.amount + 1)}
											disabled={isUpdating}
										>
											+
										</button>
									</div>
									<button
										onClick={() => handleRemoveItem(item.productId)}
										className="cart-item-remove-button"
										disabled={isUpdating}
									>
										Remover
									</button>
								</div>
							);
						})}
					</div>

					<div className="cart-summary-column">
						<h2 className="summary-title">Resumo do Pedido</h2>
						<div className="summary-row">
							<span>Subtotal ({cartItems.length} itens)</span>
							<span>R$ {calculateSubtotal().toFixed(2)}</span>
						</div>
						<div className="summary-row">
							<span>Frete</span>
							<span>Grátis</span>
						</div>
						<div className="summary-total">
							<span>Total</span>
							<span>R$ {calculateSubtotal().toFixed(2)}</span>
						</div>
						<button onClick={handleCheckout} className="checkout-button" disabled={isUpdating}>
							{isUpdating ? "Processando..." : "Finalizar Compra"}
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default CartPage;
