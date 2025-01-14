import Resource from "components/General/ListItems/Resource/Resource";
import useFetchList from "hooks/useFetchList";
import ListSearchResults from "components/RenderProps/ListSearchResults";
import { QUERY_KEY, URL } from "./utils/constants";

const Icon: React.FC = () => {
	const { data, isLoading, isError } = useFetchList(QUERY_KEY, URL);
	return (
		<ListSearchResults
			items={data}
			resourceName={QUERY_KEY}
			itemComponent={Resource}
			isLoading={isLoading}
			isError={isError}
		/>
	);
};

export default Icon;
