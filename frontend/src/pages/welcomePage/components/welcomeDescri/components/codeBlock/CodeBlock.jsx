import React, { useState, useEffect } from "react";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import TypewriteBlock from "./typewriteBlock/TypewriteBlock";

const CodeBlock = () => {
	const code1 = `print("Hello, World!")`;

	const code2 = `a = input("Enter the first number: ")`;

	const code44 = `b =  input("Enter the second number: ")`;

	const code3 = `print("The sum of the two numbers is: ", a + b)`;

	const lines1 = code1.split("\n").map((text) => ({ text }));
	const lines2 = code2.split("\n").map((text) => ({ text }));
	const lines3 = code3.split("\n").map((text) => ({ text }));
	const lines4 = code44.split("\n").map((text) => ({ text }));

	return (
		<div className="bg-[#1e1e1e] rounded-lg overflow-hidden">
			<div className="bg-muted px-4 py-2 font-medium">main.py</div>
			<div className="px-4 py-2">
				<TypewriterEffectSmooth words={lines1} personName={"Ryan"} />
				<TypewriterEffectSmooth words={lines2} personName={"John"} />
				<TypewriterEffectSmooth words={lines4} personName={"John"} />
				<TypewriterEffectSmooth words={lines3} personName={"Annie"} />
			</div>
		</div>
	);
};

export default CodeBlock;

// const CodeBlock = () => {
//   const words = [
//     {
//       text: "Build",
//     },
//     {
//       text: "awesome",
//     },
//     {
//       text: "apps",
//     },
//     {
//       text: "with",
//     },
//     {
//       text: "Aceternity.",
//       className: "text-blue-500 dark:text-blue-500",
//     },
//   ];
//   return (
//     <div className="flex flex-col items-center justify-center h-[40rem]  ">
//       <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
//         The road to freedom starts from here
//       </p>
//       <TypewriterEffectSmooth words={words} />
//       <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
//         <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
//           Join now
//         </button>
//         <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
//           Signup
//         </button>
//       </div>
//     </div>
//   );
// }

// export default CodeBlock;
