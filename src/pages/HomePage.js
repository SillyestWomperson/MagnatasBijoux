import CarrosselBanner from "../components/CarrosselBanner";
import Categorias from "../components/Categorias";
import ColecaoMagnatas from "../components/ColecaoMagnatas";
import ElesVoltaram from "../components/ElesVoltaram";

const HomePage = () => {
	return (
		<div className="home-page">
			<CarrosselBanner />
			<Categorias />
			<ElesVoltaram />
			<ColecaoMagnatas />
		</div>
	);
};

export default HomePage;
