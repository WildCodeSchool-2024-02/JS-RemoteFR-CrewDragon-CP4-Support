import { useLoaderData } from "react-router-dom";
import WheelFortune from "../components/WheelFortune";

function Wheel() {
	const { supports } = useLoaderData();
	const { sessions } = useLoaderData();
	return (
		<section className="text-center">
			<WheelFortune data={supports} sessions={sessions} />
		</section>
	);
}

export default Wheel;
