import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";
import "./styles/App.css";

import Homepage from "./components/pages/homepage";
import Tutorial from "./components/pages/tutorial";
import FetchService from "./lib/fetch";

function App() {
	const [searchParams, setSearchParams] = useSearchParams();

	const { info, data, isLoading } = FetchService.selectSet(searchParams.get("name") ?? "");

	const [availableSteps, setAvailableSteps] = useState(null);

	const [currentStep, setCurrentStep] = useState(null);

	const [base, setBase] = useState(null);

	useEffect(() => {
		if (data) {
			let temp = data.slice(1).map((lesson, i) => ({ ...lesson, id: i }));
			setAvailableSteps(temp as any); // Type assertion to fix setState type error
			setCurrentStep(temp[0] as any); // Type assertion to fix setState type error
			if (typeof info === "object" && info !== null) {
				setBase((info as any).prefix + (info as any).base); // Type guard and assertion for info properties
			}
		}
	}, [data]);

	return <>{searchParams.get("name") ? <Tutorial name={searchParams.get("name") ?? ""} /> : <Homepage />}</>;
}

export default App;
