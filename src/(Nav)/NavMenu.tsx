"use client";

import { useState } from "react";

interface IStep {
	name: string;
	href: string;
}

const steps: IStep[] = [
	{ name: "ABOUT", href: "#about" },
	{ name: "EXPERIENCE", href: "#experience" },
	{ name: "PROJECTS", href: "#projects" },
];

const NavMenu = () => {
	const [selected, setSelected] = useState<IStep>(steps[0]);

	const handleSelect = (step: IStep) => {
		setSelected(step);
	};

	return (
		<div className="flex flex-col gap-4">
			{steps.map((step, index) => {
				return (
					<a
						onClick={() => {
							handleSelect(step);
						}}
						href={step.href}
						key={index}
						className="group flex items-center cursor-pointer hover:text-white"
					>
						<div
							className={`group-hover:w-20 group-hover:bg-white flex h-[2px] items-center justify-center ${
								selected === step
									? "w-20 bg-white"
									: "w-10 bg-slate-200"
							}`}
						></div>
						<span
							className={`ml-2 group-hover:text-white text-sm ${
								selected === step
									? "text-white"
									: "text-slate-200"
							}`}
						>
							{step.name}
						</span>
					</a>
				);
			})}
		</div>
	);
};

export default NavMenu;
