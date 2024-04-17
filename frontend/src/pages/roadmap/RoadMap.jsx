import React from "react";
import Navbar from "../components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RoadFrontend from "./components/roadFrontend/RoadFrontend";
import RoadBackend from "./components/roadBackend/RoadBackend";
import RoadMobile from "./components/roadMobile/RoadMobile";

const RoadMap = () => {
	return (
		<main>
			<Navbar />
			<Tabs defaultValue="frontend">
                <div className="flex justify-center my-2">
				<TabsList>
					<TabsTrigger value="frontend">Frontend</TabsTrigger>
					<TabsTrigger value="backend">Backend</TabsTrigger>
					<TabsTrigger value="mobile">Mobile</TabsTrigger>
				</TabsList>
                </div>
				<TabsContent value="frontend">
					<RoadFrontend />
				</TabsContent>
				<TabsContent value="backend">
					<RoadBackend />
				</TabsContent>
				<TabsContent value="mobile">
					<RoadMobile />
				</TabsContent>
			</Tabs>
		</main>
	);
};

export default RoadMap;
