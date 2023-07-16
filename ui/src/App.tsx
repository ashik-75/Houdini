import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Layout, Switch, theme } from "antd";
import { useState } from "react";

import "App.scss";
import { Divider } from "antd";
import { Moon, Sun } from "lucide-react";
import Sorting from "pages/Sorting";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Navigation from "./pages/Navigation";
const ColorPicker = lazy(() => import("pages/ColorPicker"));
const ImageGeneratorFromColors = lazy(
	() => import("pages/ImageGeneratorFromColors")
);
const MarkdownEditor = lazy(() => import("pages/MarkdownEditor"));
const Icons = lazy(() => import("pages/Icons"));
const TextEditor = lazy(() => import("pages/TextEditor"));
const DataGenerator = lazy(() => import("pages/DataGenerator"));
const Base64 = lazy(() => import("pages/Base64"));
const PixelConverter = lazy(() => import("pages/PixelConverter"));
const TableOfContent = lazy(() => import("pages/TableOfContent"));
const Shades = lazy(() => import("pages/Shades"));
const TableGenerator = lazy(() => import("pages/MdTableGenerator"));

const { Sider, Content } = Layout;

function App() {
	const { defaultAlgorithm, darkAlgorithm } = theme;
	const [isDarkMode, setIsDarkMode] = useState(false);

	const handleThemeChange = (checked: boolean) => {
		setIsDarkMode(checked);
	};

	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	return (
		<ConfigProvider
			theme={{
				algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
			}}
		>
			<Layout>
				<Sider
					style={{
						backgroundColor: isDarkMode
							? "#141414"
							: colorBgContainer,
						borderRight: isDarkMode ? "none" : "1px solid #ededed",
					}}
					trigger={null}
					collapsible
					collapsed={collapsed}
				>
					<div className="demo-logo-vertical" />

					<div className="collapsibleMenu">
						<Button
							type="ghost"
							icon={
								collapsed ? (
									<MenuUnfoldOutlined />
								) : (
									<MenuFoldOutlined />
								)
							}
							onClick={() => setCollapsed(!collapsed)}
						/>
					</div>

					<Divider className="divider" />

					<Navigation />

					<div className="modeToggle">
						<Switch
							className="switch"
							checkedChildren={
								<Moon size={16} style={{ marginTop: "2px" }} />
							}
							unCheckedChildren={<Sun size={16} />}
							onChange={handleThemeChange}
						/>
					</div>
				</Sider>
				<Layout>
					<Content
						style={{
							padding: 24,
							minHeight: 280,
							backgroundColor: isDarkMode
								? "#111"
								: colorBgContainer,
						}}
					>
						<Suspense fallback={<div>Loading...</div>}>
							<div>
								<Routes>
									<Route
										path="/"
										element={<ImageGeneratorFromColors />}
									/>
									<Route
										path="/sorting"
										element={<Sorting />}
									/>
									<Route
										path="/cp"
										element={<ColorPicker />}
									/>
									<Route
										path="/me"
										element={<MarkdownEditor />}
									/>
									<Route
										path="/te"
										element={<TextEditor />}
									/>
									<Route path="/icons" element={<Icons />} />
									<Route
										path="/data_gen"
										element={<DataGenerator />}
									/>
									<Route
										path="/base_64"
										element={<Base64 />}
									/>
									<Route
										path="/shades"
										element={<Shades />}
									/>
									<Route
										path="/pixel_converter"
										element={<PixelConverter />}
									/>
									<Route
										path="/toc"
										element={<TableOfContent />}
									/>
									<Route
										path="/md_table_generator"
										element={<TableGenerator />}
									/>
								</Routes>
							</div>
						</Suspense>
					</Content>
				</Layout>
			</Layout>
		</ConfigProvider>
	);
}

export default App;
