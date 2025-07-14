import ColecoesBanner from '../components/ColecoesBanner';
import ColecoesGrid from '../components/ColecoesGrid';
import ColecoesTextoFinal from '../components/ColecoesTextoFinal';

const ColecoesPage = () => {
	return (
		<div className="colecoes-page">
			<ColecoesBanner />
			<ColecoesGrid />
			<ColecoesTextoFinal />
		</div>
	);
};

export default ColecoesPage;
