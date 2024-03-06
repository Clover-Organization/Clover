import { useEffect, useState } from "react";
import ScrollReveal from "scrollreveal";
import { Link } from "react-router-dom";

import "./style/style.css";
import logo from "./../components/assets/PTCC.png";
import WelcomeIntro from "./components/welcomeIntro/WelcomeIntro";
import WelcomeDescri from "./components/welcomeDescri/WelcomeDescri";
import WelcomeService from "./components/welcomeService/WelcomeService";
import Icon from "../components/Icon";
import Footer from "../components/footer/footer";

import { WelcomeNavbar } from "./components/welcomeNavbar/WelcomeNavbar";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

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
			<header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
				<div className="container flex h-14 max-w-screen-2xl items-center">
					<WelcomeNavbar />
					<div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
					<nav className="flex items-center">
						<div className="flex items-center justify-between">
							<div className="flex items-center justify-center gap-2">
								<Button>Sign In</Button>
								<ModeToggle />
							</div>
						</div>
					</nav>
					</div>
				</div>
			</header>

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
