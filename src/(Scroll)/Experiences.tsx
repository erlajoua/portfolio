"use client";

interface ILink {
	name: string;
	url: string;
}

interface IExperience {
	date: string;
	title: string;
	description: string;
	links?: ILink[];
	languages?: string[];
}

const experiences: IExperience[] = [
	{
		date: "2024 - PRESENT",
		title: "Lead Engineer . Upstatement",
		description:
			"Build, style, and ship high-quality websites, design systems, mobile apps, and giital experiences for a diverse array of projects for lcient sincludin Haradavad bussines Schoo, Everytown or Gun Safety, Pratt institeu, Kjoala Health, Vanderbilt University, The 19th News, and more. Provide leaddershi within engineering departmeent trhogu close collabraotion, knowloedge shares, and spearheading the devleopemnt of internal tools.",
		languages: [
			"JavaScript",
			"TypeScript",
			"HTML & CSS",
			"React",
			"Next.js",
			"React Native",
			"WordPress",
			"Contentfull",
			"Node.js",
			"PHP",
		],
		links: [
			{ name: "MusicKit.js", url: "https://google.com" },
			{ name: "9to5Mac", url: "https://googlle.com" },
		],
	},
	{
		date: "2018 - 2024",
		title: "Lead Dev Full Stack",
		description:
			"Build, style, and ship high-quality websites for lcient sincludin Haradavad bussines Schoo, Everytown or Gun Safety, Pratt institeu, Kjoala Health, Vanderbilt University, The 19th News, and more. Provide leaddershi within engineering departmeent trhogu close collabraotion, knowloedge shares, and spearheading the devleopemnt of internal tools.",
		languages: [
			"JavaScript",
			"TypeScript",
			"HTML & CSS",
			"Contentfull",
			"Node.js",
			"PHP",
		]
	},
];

const Link = ({ link }: { link: ILink }) => {
	const handleLink = (link: ILink) => {
		window.open(link.url, "_blank");
	};

	return (
		<div
			className="rounded-full text-xs font-medium text-white w-fit px-3 py-1 flex gap-2"
			onClick={() => handleLink(link)}
		>
			<div className="w-4 h-4 bg-red-500 rounded-full"></div>
			<span>{link.name}</span>
		</div>
	);
};

const TagLanguage = ({ language }: { language: string }) => {
	return (
		<div className="rounded-full text-xs font-medium bg-teal-400/10 text-teal-300 w-fit px-3 py-1">
			<span>{language}</span>
		</div>
	);
};

const ExperienceCard = ({ experience }: { experience: IExperience }) => {
	return (
		<div className="w-[650x] rounded-3xl">
			<div className="flex hover:bg-slate-800/50 w-full h-full p-8 rounded-3xl cursor-pointer">
				<div className="w-[140px]">
					<span className="text-slate-300 font-semibold text-xs mr-8">
						{experience.date}
					</span>
				</div>
				<div className="flex flex-col gap-2">
					<span className="text-base text-white font-bold hover:text-teal-300">
						{experience.title}
					</span>
					<span className="text-slate-300 text-sm">
						{experience.description}
					</span>
					<div className="flex gap-1 flex-wrap my-2">
						{experience.links?.map((link, index) => {
							return <Link key={index} link={link} />;
						})}
					</div>
					<div className="flex gap-1 flex-wrap">
						{experience.languages?.map((language, index) => {
							return (
								<TagLanguage key={index} language={language} />
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

const Experiences = () => {
	return (
		<div className="mt-16">
			{experiences.map((experience, index) => {
				return <ExperienceCard key={index} experience={experience} />;
			})}
		</div>
	);
};

export default Experiences;
