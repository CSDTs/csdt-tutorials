import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";
import "./App.css";

import Homepage from "./pages/Homepage";
import Tutorial from "./pages/Tutorial";

import FetchService from "./services/fetch.service";

function App() {
	const [searchParams, setSearchParams] = useSearchParams();

	const { info, data, isLoading } = FetchService.selectSet(searchParams.get("name"));

	const [availableSteps, setAvailableSteps] = useState(null);

	const [currentStep, setCurrentStep] = useState(null);

	const [base, setBase] = useState(null);

	useEffect(() => {
		if (data) {
			let temp = data.slice(1).map((lesson, i) => ({ ...lesson, id: i }));
			setAvailableSteps(temp);
			setCurrentStep(temp[0]);
			setBase(info.prefix + info.base);
		}
	}, [data]);

	return <>{searchParams.get("name") ? <Tutorial name={searchParams.get("name")} /> : <Homepage />}</>;
}

export default App;
