import { useEffect, useState } from "react";
import ScrollReveal from "scrollreveal";
import "./style/style.css";
import WelcomeIntro from "./components/welcomeIntro/WelcomeIntro";
import WelcomeDescri from "./components/welcomeDescri/WelcomeDescri";
import WelcomeService from "./components/welcomeService/WelcomeService";
import Footer from "../components/footer/footer";
import WelcomeHeader from "./components/welcomeHeader/WelcomeHeader";

const welcome = () => {
	const [currentPage, setCurrentPage] = useState(1);

	// const nextPage = () => {
	//     setCurrentPage((prevPage) => (prevPage < 2 ? prevPage + 1 : 1));
	// };

	// const prevPage = () => {
	//     setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 2));
	// };

	useEffect(() => {
		const sr = ScrollReveal();

		const calculateDistance = () => {
			// Lógica para calcular a distância com base em fatores responsivos
			return window.innerWidth > 768 ? "70px" : "15px";
		};
		sr.reveal(".logoWelcomeTxt", {
			origin: "top",
			duration: 1000,
			distance: calculateDistance(),
			reset: true,
		});
		sr.reveal(".welcomeIntroArticle", {
			origin: "left",
			duration: 1000,
			distance: calculateDistance(),
			reset: true,
		});
		sr.reveal(".animation", {
			origin: "bottom",
			duration: 1000,
			distance: calculateDistance(),
			reset: true,
		});
		sr.reveal(".WelcomeTecnoArticle", {
			origin: "bottom",
			duration: 1000,
			distance: calculateDistance(),
			reset: true,
		});
		sr.reveal(".tittleService", {
			origin: "left",
			duration: 1000,
			distance: calculateDistance(),
			reset: true,
		});
	}, []);

	useEffect(() => {
		const sr = ScrollReveal();

		const calculateDistance = () => {
			// Lógica para calcular a distância com base em fatores responsivos
			return window.innerWidth > 768 ? "70px" : "15px";
		};

		sr.reveal(".WelcomeDescArticle", {
			origin: "bottom",
			duration: 1000,
			distance: calculateDistance(),
			reset: true,
		});
		sr.reveal(".WelcomeDescBalance", {
			origin: "bottom",
			duration: 1000,
			distance: calculateDistance(),
			reset: true,
		});
		sr.reveal(".WelcomeServiceArticle", {
			origin: "bottom",
			duration: 1000,
			distance: calculateDistance(),
			reset: true,
		});

		const intervalId = setInterval(() => {
			setCurrentPage((prevPage) => (prevPage < 2 ? prevPage + 1 : 1));
		}, 10000);

		// Limpar o intervalo quando o componente for desmontado
		return () => clearInterval(intervalId);
	}, [currentPage]);

	return (
		<main className={`welcomeMain page-${currentPage}`}>
			<WelcomeHeader />
			<WelcomeIntro />
			{currentPage === 1 && <WelcomeDescri />}
			{currentPage === 2 && <WelcomeService />}

			{/* Navegação do carrossel */}
			{/* <div>
        <button onClick={prevPage}>Anterior</button>
        <button onClick={nextPage}>Próxima</button>
      </div> */}
			<Footer />
		</main>
	);
};
export default welcome;
