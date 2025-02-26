import axios from "axios";
import useSWR from "swr";
import FetchService from "./fetch";

const loadBaseProject = (url: string) => {
	const fetcher = async (url: string) => await axios.get(url).then((res) => res.data);

	const { data, error } = useSWR(url, fetcher, {
		revalidateOnFocus: true,
	});

	return {
		data: data,
		isLoading: !error && !data,
		isError: error,
	};
};

const loadWhitelistedBlocks = (ide: any, final: any, current: any) => {};

const CSnapService = {
	loadBaseProject,
};

export default CSnapService;
