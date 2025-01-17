import { useQuery } from "@tanstack/react-query";
import { getData } from "api/API";

const useFetchList = (key: string, url: string) => {
	const { data, isLoading, isError, error, isSuccess } = useQuery({
		queryKey: [key],
		queryFn: () => {
			return getData(url);
		},
	});

	return { data, isLoading, isError, error, isSuccess };
};

export default useFetchList;
