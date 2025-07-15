import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

import BannerImage1 from "../assets/img/homepage/banner1.png";
import BannerImage2 from "../assets/img/homepage/banner2.png";
import BannerImage3 from "../assets/img/homepage/banner3.png";

const CarrosselBanner = () => {
	const [index, setIndex] = useState(0);

	const handleSelect = (selectedIndex) => {
		setIndex(selectedIndex);
	};

	return (
		<Carousel activeIndex={index} onSelect={handleSelect} className="carrossel-banner" data-bs-theme="dark">
			<Carousel.Item>
				<Link to="/new-collection">
					<img className="d-block w-100" src={BannerImage1 || "/placeholder.svg"} alt="First slide" />
				</Link>
			</Carousel.Item>
			<Carousel.Item>
				<Link to="/brincos">
					<img className="d-block w-100" src={BannerImage2 || "/placeholder.svg"} alt="Second slide" />
				</Link>
			</Carousel.Item>
			<Carousel.Item>
				<Link to="/colares">
					<img className="d-block w-100" src={BannerImage3 || "/placeholder.svg"} alt="Third slide" />
				</Link>
			</Carousel.Item>
		</Carousel>
	);
};

export default CarrosselBanner;
