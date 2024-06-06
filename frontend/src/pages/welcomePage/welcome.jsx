import { useEffect, useState } from "react";
import ScrollReveal from "scrollreveal";
import "./style/style.css";
import WelcomeIntro from "./components/welcomeIntro/WelcomeIntro";
import WelcomeDescri from "./components/welcomeDescri/WelcomeDescri";
import WelcomeService from "./components/welcomeService/WelcomeService";
import Footer from "../components/footer/footer";
import WelcomeHeader from "./components/welcomeHeader/WelcomeHeader";

const welcome = () => {
	return (
		<main className="max-w-1020px">
			<WelcomeHeader />
			<WelcomeIntro />
			<WelcomeDescri />
			<WelcomeService />
			{/* <WelcomeService /> */}
			{/* <Footer /> */}
		</main>
	);
};
export default welcome;
