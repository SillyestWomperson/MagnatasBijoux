// eslint-disable-next-line
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import "./css/App.css";

import HomePage from "./pages/HomePage";
import SobreNosPage from "./pages/SobreNosPage";
import ColecoesPage from "./pages/ColecoesPage";
import FaleConoscoPage from "./pages/FaleConoscoPage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import CartPage from "./pages/CartPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";

const App = () => {
	return (
		<>
			<NavBar />
			<main>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/sobre-nos" element={<SobreNosPage />} />
					<Route path="/new-collection" element={<ColecoesPage />} />
					<Route path="/contato" element={<FaleConoscoPage />} />
					<Route path="/login" element={<AuthPage />} />
					<Route path="/register" element={<AuthPage />} />
					<Route path="/me" element={<ProfilePage />} />
					<Route path="/cart" element={<CartPage />} />
					<Route path="/produto/:productId" element={<ProductDetailsPage />} />
					{/* ATENÇÃO: OUTRAS ROTAS VÃO VIR AQUI!!!! */}
				</Routes>
			</main>
			<Footer />
		</>
	);
};

export default App;
