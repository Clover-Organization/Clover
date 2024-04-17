import React, { useState } from "react";
import {
	AccordionTrigger,
	AccordionContent,
	AccordionItem,
	Accordion,
} from "@/components/ui/accordion";
import {
	HomeIcon,
	MessageCircleIcon,
	CalendarIcon,
	DollarSignIcon,
} from "lucide-react";

const WelcomeService = () => {
    
    const [selectedTab, setSelectedTab] = useState(null);

	return (
		<section className="my-12 p-8 sm:pt-6 md:pt-8 lg:pt-10 xl:pt-12 bg-secondary">
            <div>
                <span>
                    <h1 className="text-3xl font-semibold text-center text-primary">
                        Explore some of the features of Clover
                    </h1>
                </span>
            </div>
			<div className="flex flex-col sm:flex-row justify-center items-center mt-10 sm:mt-20 md:mt-32 lg:mt-44 gap-8">
            <Accordion type="single" className="w-full sm:w-[400px]">
					<AccordionItem value="introduction">
						<AccordionTrigger className="flex items-start gap-2 p-3" onClick={() => setSelectedTab('Projects')}>
							<HomeIcon className="w-5 h-5" />
							<span className="font-medium">Build Projects</span>
						</AccordionTrigger>
						<AccordionContent className="grid gap-4 p-3">
							<div className="text-sm grid gap-2 leading-loose">
								<p>
									Clover provides a sanctuary for developers
									of all skill levels to nurture their coding
									ambitions. With its sleek and minimalist
									design, our editor offers a distraction-free
									environment where you can focus solely on
									your code. Whether you're crafting a simple
									script or architecting a complex
									application, Clover empowers you to bring
									your ideas to fruition with precision and
									clarity.
								</p>
							</div>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="chat">
						<AccordionTrigger className="flex items-start gap-2 p-3" onClick={() => setSelectedTab('Editor')}>
							<MessageCircleIcon className="w-5 h-5" />
							<span className="font-medium">Clover Editor</span>
						</AccordionTrigger>
						<AccordionContent className="grid gap-4 p-3">
							<div className="text-sm grid gap-2 leading-loose">
								<p>
									Clover Editor is highly customizable! From
									themes and syntax highlighting to keyboard
									shortcuts and layout, mold your coding
									environment to reflect your style and
									optimize your productivity. Whether you
									prefer a dark-themed interface for
									late-night coding sessions or a light-themed
									one for clarity during the day, the choice
									is yours.
								</p>
							</div>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="calendar">
						<AccordionTrigger className="flex items-start gap-2 p-3" onClick={() => setSelectedTab('Roadmaps')}>
							<CalendarIcon className="w-5 h-5" />
							<span className="font-medium">Clover Roadmaps</span>
						</AccordionTrigger>
						<AccordionContent className="grid gap-4 p-3">
							<div className="text-sm grid gap-2 leading-loose">
								<p>
									With Clover Roadmaps, clarity and direction
									are at your fingertips. Whether you're a
									novice eager to explore the fundamentals or
									a seasoned developer aiming to master
									advanced concepts, our comprehensive
									roadmaps provide a clear route to success.
									From learning the basics of HTML and CSS to
									diving deep into machine learning
									algorithms, each roadmap is meticulously
									crafted to help you achieve your goals.
								</p>
							</div>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="pricing">
						<AccordionTrigger className="flex items-start gap-2 p-3" onClick={() => setSelectedTab('Pricing')}>
							<DollarSignIcon className="w-5 h-5" />
							<span className="font-medium">Pricing</span>
						</AccordionTrigger>
						<AccordionContent className="grid gap-4 p-3">
							<div className="text-sm grid gap-2 leading-loose">
								<p>
									With Clover, there are no restrictions
									on creativity. Experiment with new
									technologies, build ambitious projects, and
									showcase your talents to the world without
									worrying about subscription fees or hidden
									charges.
								</p>
							</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
				<div className="p-4 border bg-primary h-66 dark:border-gray-800 w-full sm:w-[800px] ">
					<div className="text-center">
						<h3 className="text-lg font-semibold">
							Selected Tab Content
						</h3>
						{selectedTab === 'Projects' && (
                            <p className="text-sm text-gray-500">
                                Content for Tab 1
                            </p>
                        )}
                        {selectedTab === 'Pricing' && (
                            <p className="text-sm text-gray-500">
                                Content for Tab 2
                            </p>
                        )}
					</div>
				</div>
			</div>
		</section>
	);
};
export default WelcomeService;
