export const FrontendData = () => [
	{ data: { id: "node1", label: "HTML" } },
	{ data: { id: "node2", label: "CSS" } },
	{ data: { id: "node3", label: "JavaScript" } },
	{ data: { id: "node4", label: "React" } },
	{ data: { id: "node5", label: "Vue.js" } },
	{ data: { id: "node6", label: "Angular" } },
	{ data: { id: "node7", label: "TypeScript" } },
	{ data: { id: "node8", label: "SASS" } },
	{ data: { id: "node9", label: "Bootstrap" } },
	{ data: { id: "node10", label: "Material-UI" } },
	{ data: { id: "edge1", source: "node1", target: "node2" } },
	{ data: { id: "edge2", source: "node2", target: "node3" } },
	{ data: { id: "edge3", source: "node3", target: "node4" } },
	{ data: { id: "edge4", source: "node3", target: "node5" } },
	{ data: { id: "edge5", source: "node3", target: "node6" } },
	{ data: { id: "edge6", source: "node3", target: "node7" } },
	{ data: { id: "edge7", source: "node2", target: "node8" } },
	{ data: { id: "edge8", source: "node2", target: "node9" } },
	{ data: { id: "edge9", source: "node4", target: "node10" } },
	{ data: { id: "edge10", source: "node5", target: "node10" } },
	{ data: { id: "edge11", source: "node6", target: "node10" } },
];