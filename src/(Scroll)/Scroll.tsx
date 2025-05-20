import Presentation from "./Presentation";
import Experiences from "./Experiences";
import Projects from "./Projects";

const Scroll = () => {
	return (
		<div className="w-1/2 max-h-screen flex flex-col overflow-y-auto py-24 pr-64">
			<Presentation />
            <Experiences />
            <Projects />
		</div>
	);
};

export default Scroll;
