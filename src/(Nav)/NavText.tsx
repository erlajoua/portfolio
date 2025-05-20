import { config } from "@/app/const";

const NavText = () => {
	return (
		<div className="flex flex-col text-white">
			<h1 className="font-bold text-5xl mb-1">
				{config.firstName} {config.lastName}
			</h1>
			<h3 className="text-xl mb-2">{config.job}</h3>
			<span className="text-lg text-slate-200 w-3/5">{config.description}</span>
		</div>
	);
};

export default NavText;