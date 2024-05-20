import { useEffect, useRef, useState } from "react";
import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";
import { useTheme } from "@/components/theme-provider";

export const useRoadMap = (graphData) => {
	const { theme } = useTheme();
	const fontFamily = localStorage.getItem("fontFamily");
	const [bgTheme, setBgTheme] = useState(theme);
	const containerRef = useRef(null);
	const cy = useRef(null);
	const [isMounted, setIsMounted] = useState(false);

	cytoscape.use(dagre);

	useEffect(() => {
		setBgTheme(theme);
	}, [theme]);

	useEffect(() => {
		setIsMounted(true);
		return () => setIsMounted(false);
	}, []);

	useEffect(() => {
		if (isMounted && containerRef.current) {
			cy.current = cytoscape({
				container: containerRef.current,
				elements: graphData,
				style: [
					{
						selector: "node",
						style: {
							"background-color":
								bgTheme === "dark" ? "#09090b" : "#fff",
							color: bgTheme === "dark" ? "#fff" : "#000",
							shape: "round-rectangle",
							"border-width": 2,
							"border-color": "#16a34a",
							label: "data(label)",
							"font-family": fontFamily
								? fontFamily
								: "JetBrains mono",
							"font-size": "22px",
							"text-wrap": "wrap",
							"text-max-width": "100px",
							"text-valign": "center",
							"text-halign": "center",
							width: 160,
							height: 50,
						},
					},
					{
						selector: "edge",
						style: {
							width: 2,
							"line-color": bgTheme === "dark" ? "#fff" : "#000",
							"target-arrow-color":
								bgTheme === "dark" ? "#fff" : "#000",
							"target-arrow-shape": "triangle",
							"curve-style": "bezier",
							label: "data(label)",
							"font-family": fontFamily
								? fontFamily
								: "JetBrains mono",
							"font-size": "10px",
							"text-wrap": "wrap",
							"text-max-width": "100px",
							"text-valign": "center",
							"text-halign": "center",
						},
					},
				],
				layout: { name: "dagre" },
				minZoom: 0.2,
				maxZoom: 2,
				wheelSensitivity: 0.3,
			});
			const containerElement = containerRef.current;

			let isGrabbing = false;

			const handleMouseDown = () => {
				isGrabbing = true;
				containerElement.style.cursor = 'grabbing';
			};

			const handleMouseUp = () => {
				isGrabbing = false;
				containerElement.style.cursor = 'default';
			};

			containerElement.addEventListener('mousedown', handleMouseDown);
			containerElement.addEventListener('mouseup', handleMouseUp);

			return () => {
				containerElement.removeEventListener('mousedown', handleMouseDown);
				containerElement.removeEventListener('mouseup', handleMouseUp);
				if (cy.current) {
					cy.current.destroy();
				}
			};
		}
	}, [graphData, isMounted]);

	useEffect(() => {
		return () => {
			if (cy.current) {
				cy.current.destroy();
				cy.current = null;
			}
		};
	}, [isMounted]);

	return { containerRef };
};

export default useRoadMap;
