import { ConfigProvider, Layout } from "antd";
import { ErrorBoundary } from "react-error-boundary";
import RoutesWithPageTitle from "routes";
import Sidebar from "components/Layouts/Sidebar";
import CookieConsent from "pages/Footer/CookieConsent";
import useTheme from "hooks/useTheme";
import PopupSearch from "components/General/PopupSearch";
import FloatingBar from "components/Layouts/FloatingBar";

const { Content } = Layout;

const App: React.FC = () => {
	const theme = useTheme();

	return (
		<ErrorBoundary fallback={<p>Something went wrong</p>}>
			<ConfigProvider theme={theme}>
				<Layout>
					<Layout hasSider>
						<Sidebar />
						<Layout>
							<Content>
								<FloatingBar />
								<RoutesWithPageTitle />
							</Content>
						</Layout>
					</Layout>
				</Layout>
			</ConfigProvider>
			<CookieConsent />
			<PopupSearch />
		</ErrorBoundary>
	);
};

export default App;
