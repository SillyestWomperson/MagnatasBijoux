import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import "./css/App.css";

import HomePage from "./pages/HomePage";
import SobreNosPage from "./pages/SobreNosPage";
import ColecoesPage from "./pages/ColecoesPage";
import FaleConoscoPage from "./pages/FaleConoscoPage";

const App = () => {
	return (
		<Router>
			<NavBar />
			<main>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/sobre-nos" element={<SobreNosPage />} />
					<Route path="/new-collection" element={<ColecoesPage />} />
					<Route path="/contato" element={<FaleConoscoPage />} />
					{/* ATENÇÃO: OUTRAS ROTAS VÃO VIR AQUI!!!! */}
				</Routes>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
