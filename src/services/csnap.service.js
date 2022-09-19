import axios from "axios";
import useSWR from "swr";
import FetchService from "./fetch.service";

const loadBaseProject = (url) => {
	const fetcher = async (url) => await axios.get(url).then((res) => res.data);

	const { data, error } = useSWR(url, fetcher, {
		revalidateOnFocus: true,
	});

	return {
		data: data,
		isLoading: !error && !data,
		isError: error,
	};
};

const loadWhitelistedBlocks = (ide, final, current) => {};

const CSnapService = {
	loadBaseProject,
};

export default CSnapService;
