import axios from "axios";
import useSWR from "swr";
import { AvailableSets } from "../data";

const fetchLocalData = (url) => {
	const fetcher = async (url) => await axios.get(url).then((res) => res.data);

	const { data, error } = useSWR(url, fetcher, {
		revalidateOnFocus: true,
	});

	return {
		info: data && data.length > 0 && data[0]?.tutorial_title ? data[0] : "",
		data: data,
		isLoading: !error && !data,
		isError: error,
	};
};

const selectSet = (tag) => {
	const data = AvailableSets[tag || "tooled-leather-params"];

	return {
		info: data[0]?.tutorial_title ? data[0] : "",
		data: data,
		isLoading: !data,
	};
};

const fetchXML = (url) => {
	return axios
		.get(url, {
			headers: {
				"Content-Type": "application/json",
			},
		})
		.then((response) => {
			return response.data;
		});
};

const FetchService = {
	fetchLocalData,
	fetchXML,
	selectSet,
};

export default FetchService;
