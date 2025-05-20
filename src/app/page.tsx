import Nav from "../(Nav)/Nav";
import Scroll from "../(Scroll)/Scroll";

export default function Home() {
	return (
		<div className="bg-slate-900 w-full flex text-white">
			<Nav />
			<Scroll />
		</div>
	);
}
