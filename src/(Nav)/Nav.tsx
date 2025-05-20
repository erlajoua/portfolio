import NavText from "./NavText";
import NavMenu from "./NavMenu";
import NavSocials from "./NavSocials";

const Nav = () => {
	return (
		<div className="w-1/2 h-screen py-24 pl-64 flex flex-col justify-between">
			<div className="flex flex-col gap-16">
				<NavText />
				<NavMenu />
			</div>
			<NavSocials />
		</div>
	);
};

export default Nav;
