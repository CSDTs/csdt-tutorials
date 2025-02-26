import axios from "axios";
import useSWR from "swr";
import { AvailableSets } from "../data";
import { Tutorial, TutorialInfo } from "../types";
type Step = {
	id: number;
	title: string;
	explanation: string;
	whitelist: string[];
	modifiers: string[];
	legacy: string[];
};
const fetchLocalData = (url: string) => {
	const fetcher = async (url: string) => await axios.get(url).then((res) => res.data);

	const { data, error } = useSWR(url, fetcher, {
		revalidateOnFocus: true,
	});

	return {
		info: data && data.length > 0 && data[0]?.tutorial_title ? data[0] : null,
		data: data,
		isLoading: !error && !data,
		isError: error,
	} as {
		info: TutorialInfo | null;
		data: Tutorial;
		isLoading: boolean;
		isError: boolean;
	};
};

const selectSet = (tag: string) => {
	const validate = tag in AvailableSets ? tag : "tooled-leather-params";
	const data = AvailableSets[validate as keyof typeof AvailableSets];

	return {
		info: data[0]?.tutorial_title ? data[0] : null,
		data: data,
		isLoading: !data,
	} as {
		info: TutorialInfo | null;
		data: Tutorial;
		isLoading: boolean;
	};
};

const fetchXML = (url: string) => {
	return axios.get(url, { headers: { "Content-Type": "application/json" } }).then((response) => {
		return response.data;
	});
};

const FetchService = {
	fetchLocalData,
	fetchXML,
	selectSet,
};

export default FetchService;
