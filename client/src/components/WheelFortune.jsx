import { Wheel } from "react-custom-roulette";
import { useEffect, useState } from "react";

function WheelFortune({ data, sessions }) {
	const [getSession, setGetSession] = useState("");
	const [transformedData, setTransformedData] = useState([{ option: "" }]);

	const handleGetSession = (e) => {
		setGetSession(+e.target.value);
	};

	const transformData = (data, session) => {
		const response = data
			.filter((item) => !item.checked && item.sessionId === session)
			.map((item) => {
				const { title, session, ...rest } = item;
				return {
					...rest,
					option: `${title} - ${session.title}`,
					session: {
						...session,
						option: session.title,
					},
				};
			});
		return response.length !== 0 ? response : [{ option: "" }];
	};

	useEffect(() => {
		setTransformedData(transformData(data, getSession));
	}, [data, getSession]);

	const [mustSpin, setMustSpin] = useState(false);
	const [prizeNumber, setPrizeNumber] = useState(0);

	const backgroundColors = ["#ff8f43", "#70bbe0", "#0b3351", "#f9dd50"];
	const spinDuration = 1.0;

	const handleSpinClick = () => {
		if (!mustSpin) {
			const newPrizeNumber = Math.floor(
				Math.random() * transformedData.length
			);
			setPrizeNumber(newPrizeNumber);
			setMustSpin(true);
		}
	};

	return (
		<div className="flex flex-col">
			<div className="my-16">
				<button
					type="button"
					className="rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-full"
					onClick={handleSpinClick}
				>
					Faire tourner la roue
				</button>
				<select
					name="sessions"
					id="sessions"
					className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
					onChange={handleGetSession}
				>
					<option value="-">-</option>
					{sessions.map((session) => (
						<option key={session.id} value={session.id}>
							{session.title}
						</option>
					))}
				</select>
			</div>

			<Wheel
				mustStartSpinning={mustSpin}
				prizeNumber={prizeNumber}
				data={transformedData}
				backgroundColors={backgroundColors}
				textColors={["#ffffff"]}
				spinDuration={spinDuration}
			/>
		</div>
	);
}

export default WheelFortune;
