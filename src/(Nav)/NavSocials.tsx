"use client";

interface ISocial {
	name: string;
	url: string;
}

const socials: ISocial[] = [
	{
		name: "LinkedIn",
		url: "https://linkedin.com",
	},
	{
		name: "Insta",
		url: "https://Insta.com",
	},
	{
		name: "YouTube",
		url: "https://YouTube.com",
	},
];

const Social = ({ social }: { social: ISocial }) => {
	const handleOpen = () => {
		window.open(social.url, "_blank");
	};

	return (
		<div
			onClick={handleOpen}
			className="w-8 h-8 bg-green-500 hover:bg-green-300 rounded-lg flex items-center justify-center cursor-pointer mt-6"
		>
			{social.name.slice(0, 1)}
		</div>
	);
};

const NavSocials = () => {
	return (
		<div className="flex gap-2">
			{socials.map((social, index) => {
				return <Social key={index} social={social} />;
			})}
		</div>
	);
};

export default NavSocials;
