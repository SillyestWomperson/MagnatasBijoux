import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../css/ProductDetailsPage.css";

const ProductDetailsPage = () => {
    const { productId } = useParams();
    const { isAuthenticated, token } = useAuth();

    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedBathedType, setSelectedBathedType] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [cartMessage, setCartMessage] = useState("");

    const [expandedSection, setExpandedSection] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setIsLoading(true);
            setError("");
            try {
                const response = await fetch(
                    `https://magnatas-bijoux-server.vercel.app/api/products/${productId}`
                );
                const data = await response.json();

                if (response.ok) {
                    setProduct(data.product);
                    if (data.product.imagesUrl && data.product.imagesUrl.length > 0) {
                        setSelectedImage(data.product.imagesUrl[0]);
                    }
                    if (data.product.bathedTypes && data.product.bathedTypes.length > 0) {
                        setSelectedBathedType(data.product.bathedTypes[0]);
                    }
                    if (data.product.sizesAvailable && data.product.sizesAvailable.length > 0) {
                        setSelectedSize(data.product.sizesAvailable[0]);
                    }
                } else {
                    setError(data.message || "Erro ao carregar o produto.");
                }
            } catch (err) {
                console.error("Erro ao buscar detalhes do produto:", err);
                setError("Ocorreu um erro ao conectar com o servidor para carregar o produto.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleQuantityChange = (delta) => {
        setQuantity((prevQty) => Math.max(1, prevQty + delta));
    };

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            setCartMessage("Por favor, faça login para adicionar itens ao carrinho.");
            return;
        }

        setCartMessage("Adicionando ao carrinho...");

        try {
            const response = await fetch("https://magnatas-bijoux-server.vercel.app/api/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    productId: product.productId,
                    amount: quantity,
                    size: selectedSize,
                    bathedType: selectedBathedType,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setCartMessage("Produto adicionado ao carrinho com sucesso!");
            } else {
                setCartMessage(data.message || "Erro ao adicionar produto ao carrinho.");
            }
        } catch (err) {
            console.error("Erro ao adicionar ao carrinho:", err);
            setCartMessage("Ocorreu um erro ao conectar com o servidor para adicionar ao carrinho.");
        }
    };

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    const renderStars = (stars) => {
        const fullStars = Math.floor(stars);
        const hasHalfStar = stars % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        return (
            <div className="star-rating">
                {[...Array(fullStars)].map((_, i) => (
                    <i key={`full-${i}`} className="fas fa-star filled"></i>
                ))}
                {hasHalfStar && <i className="fas fa-star-half-alt filled"></i>}
                {[...Array(emptyStars)].map((_, i) => (
                    <i key={`empty-${i}`} className="far fa-star"></i>
                ))}
            </div>
        );
    };

    if (isLoading) {
        return (
            <div className="product-details-page-container loading-state">
                <p>Carregando detalhes do produto...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="product-details-page-container error-state">
                <p className="error-message">{error}</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="product-details-page-container error-state">
                <p className="error-message">Produto não encontrado.</p>
            </div>
        );
    }

    return (
        <div className="product-details-page-container">
            <div className="product-content-grid">
                <div className="product-images-column">
                    <div className="main-image-container">
                        <img src={selectedImage} alt={product.productId} className="main-product-image" />
                    </div>
                    <div className="thumbnail-images">
                        {product.imagesUrl.map((imgUrl, index) => (
                            <img
                                key={index}
                                src={imgUrl}
                                alt={`Thumbnail ${index + 1}`}
                                className={`thumbnail-image ${selectedImage === imgUrl ? "active" : ""}`}
                                onClick={() => setSelectedImage(imgUrl)}
                            />
                        ))}
                    </div>
                </div>

                <div className="product-details-column">
                    <h1 className="product-name">{product.name || product.productId}</h1>
                    {renderStars(product.stars)}
                    <p className="product-price">R$ {product.price.toFixed(2)}</p>

                    <div className="product-options">
                        {product.bathedTypes && product.bathedTypes.length > 0 && (
                            <div className="option-group">
                                <span className="option-label">Banho:</span>
                                <div className="bathed-type-options">
                                    {product.bathedTypes.map((type) => (
                                        <div
                                            key={type}
                                            className={`bathed-type-circle ${type.toLowerCase()} ${
                                                selectedBathedType === type ? "selected" : ""
                                            }`}
                                            onClick={() => setSelectedBathedType(type)}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {product.sizesAvailable && product.sizesAvailable.length > 0 && (
                            <div className="option-group">
                                <span className="option-label">Tamanho:</span>
                                <select
                                    value={selectedSize}
                                    onChange={(e) => setSelectedSize(e.target.value)}
                                    className="size-select"
                                >
                                    {product.sizesAvailable.map((size) => (
                                        <option key={size} value={size}>
                                            {size}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div className="quantity-control">
                            <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                                -
                            </button>
                            <span className="quantity-display">{quantity}</span>
                            <button onClick={() => handleQuantityChange(1)}>+</button>
                        </div>
                    </div>

                    <button onClick={handleAddToCart} className="add-to-cart-button">
                        Comprar
                    </button>
                    {cartMessage && <p className="cart-message">{cartMessage}</p>}

                    <div className="product-info-sections">
                        <div className="info-section">
                            <div className="info-header" onClick={() => toggleSection("description")}>
                                <span>DESCRIÇÃO</span>
                                <i className={`fas fa-chevron-${expandedSection === "description" ? "up" : "down"}`}></i>
                            </div>
                            {expandedSection === "description" && (
                                <div className="info-content">
                                    <p>{product.description}</p>
                                </div>
                            )}
                        </div>

                        <div className="info-section">
                            <div className="info-header" onClick={() => toggleSection("composition")}>
                                <span>COMPOSIÇÃO</span>
                                <i className={`fas fa-chevron-${expandedSection === "composition" ? "up" : "down"}`}></i>
                            </div>
                            {expandedSection === "composition" && (
                                <div className="info-content">
                                    <p>{product.composition}</p>
                                </div>
                            )}
                        </div>

                        <div className="info-section">
                            <div className="info-header" onClick={() => toggleSection("care")}>
                                <span>CUIDADOS</span>
                                <i className={`fas fa-chevron-${expandedSection === "care" ? "up" : "down"}`}></i>
                            </div>
                            {expandedSection === "care" && (
                                <div className="info-content">
                                    <p>{product.care}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
