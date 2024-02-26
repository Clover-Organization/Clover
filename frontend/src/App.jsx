import { useState, useEffect } from "react";
import ScrollReveal from "scrollreveal";
import "./App.css";
import "./pages/auth/components/style.css";
import Navbar from "./pages/components/Navbar";
import Home from "./pages/home/Home";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
	const [role, setRole] = useState(localStorage.getItem("role"));
	const token = localStorage.getItem("token");

	useEffect(() => {
		// Simule uma chamada à API para obter a role do usuário
		// Aqui você deve substituir isso por sua lógica real de obtenção de dados
		const fetchUserRole = async () => {
			// Simulando uma chamada à API
			const response = await fetch("http://localhost:8080/token", {
				headers: {
					Authorization: `Bearer ${token}`, // Substitua pelo token real
				},
			});

			if (response.ok) {
				const responseBody = await response.json();
				setRole(responseBody.role);
			} else {
				setRole(null);
			}
		};

		fetchUserRole();
	}, []);

	useEffect(() => {
		const sr = ScrollReveal();

		const calculateDistance = () => {
			return window.innerWidth > 768 ? "70px" : "0px";
		};

		sr.reveal(".homeDescript", {
			origin: "top",
			duration: 1000,
			distance: calculateDistance(),
			reset: true,
		});
		sr.reveal(".headerLogoName", {
			origin: "left",
			duration: 1000,
			distance: calculateDistance(),
			reset: true,
		});
		sr.reveal(".responsiveMenu", {
			origin: "right",
			duration: 1000,
			distance: calculateDistance(),
			reset: true,
		});
	}, []);

	const [count, setCount] = useState(0);

	return (
		<>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<main className="appMain">
					<Navbar />
					<Home />
				</main>
			</ThemeProvider>
		</>
	);
}

export default App;
