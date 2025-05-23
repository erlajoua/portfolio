import NavText from "./NavText";
import NavMenu from "./NavMenu";
import NavSocials from "./NavSocials";

const Nav = () => {
	return (
		<div className="h-full py-24 px-8 lg:pl-64 lg:pr-16 flex flex-col justify-between">
			<div className="flex flex-col gap-16">
				<NavText />
				<NavMenu />
			</div>
			<NavSocials />
		</div>
	);
};

export default Nav;