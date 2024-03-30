import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import cytoscape from 'cytoscape';
import { roadData } from "./components/roadData/roadData";

const RoadMap = () => {
    const fontFamily = localStorage.getItem('fontFamily');
    const [bgTheme, setBgTheme] = useState(localStorage.getItem("vite-ui-theme"));
    const graphData = roadData();
    const containerRef = useRef(null);
    const cy = useRef(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setBgTheme(localStorage.getItem("vite-ui-theme"));
        }, 1000);

        return () => clearInterval(intervalId);
    }, [bgTheme]);

    useEffect(() => {
        if (isMounted && containerRef.current) {
            cy.current = cytoscape({
                container: containerRef.current,
                elements: graphData,
                style: [
                    {
                        selector: 'node',
                        style: {
                            'background-color': bgTheme == "dark" ? "white" : "black",
                            'border-width': 1,
                            'width': 30,
                            'height': 30,
                            'text-margin-y': 3,
                            'label': 'data(label)',
                            'text-valign': 'bottom',
                            'text-halign': 'center',
                            'font-size': '12px',
                            'color': bgTheme == "dark" ? "white" : "black",
                            'font-family': fontFamily ? fontFamily : 'JetBrains mono',
                        }
                    },
                    {
                        selector: 'edge',
                        style: {
                            'width': 3,
                            'line-color': '#ccc',
                            'target-arrow-color': '#ccc',
                            'target-arrow-shape': 'triangle',
                            'curve-style': 'bezier'
                        }
                    }
                ],
                layout: { name: 'cose' },
                minZoom: 0.1,
                maxZoom: 2,
                wheelSensitivity: 0.3,
            });

            // Adiciona animação ao passar o mouse sobre os nós
            cy.current.nodes().on('mouseover', function (event) {
                const node = event.target;
                node.animate({
                    style: {
                        'background-color': '#1fdf64',
                        'border-color': '#222',
                        'padding': "1",
                        'text-margin-y': 5,
                    }
                });
            });

            // Remove a animação quando o mouse sai do nó
            cy.current.nodes().on('mouseout', function (event) {
                const node = event.target;
                node.animate({
                    style: {
                        'background-color': bgTheme == "dark" ? "white" : "black",
                        'padding': "0",
                        'text-margin-y': 1,
                    }
                });
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

            const handleMouseMove = () => {
                if (isGrabbing) {
                    containerElement.style.cursor = 'grabbing';
                }
            };

            containerElement.addEventListener('mousedown', handleMouseDown);
            containerElement.addEventListener('mouseup', handleMouseUp);
            containerElement.addEventListener('mousemove', handleMouseMove);

            return () => {
                containerElement.removeEventListener('mousedown', handleMouseDown);
                containerElement.removeEventListener('mouseup', handleMouseUp);
                containerElement.removeEventListener('mousemove', handleMouseMove);
                if (cy.current) {
                    cy.current.destroy();
                }
            };
        }
    }, [graphData, isMounted]);

    return (
        <main>
            <Navbar />
            <div
                ref={containerRef}
                style={{
                    width: '100%',
                    height: '94vh',
                }}
            />
        </main>
    )
}

export default RoadMap;
