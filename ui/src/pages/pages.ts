import { lazy } from "react";

const News = lazy(() => import("pages/News"));

const ColorPicker = lazy(() => import("pages/Colors/ColorPicker"));
const Shades = lazy(() => import("pages/Colors/Shades"));

const MarkdownEditor = lazy(() => import("pages/Markdown/MarkdownEditor"));
const TableOfContent = lazy(() => import("pages/Markdown/TableOfContent"));
const TableGenerator = lazy(() => import("pages/Markdown/MdTableGenerator"));

const ImageGeneratorFromColors = lazy(
	() => import("pages/Data/ImageGeneratorFromColors")
);
const DataGenerator = lazy(() => import("pages/Data/DataGenerator"));
const Sorting = lazy(() => import("pages/Data/Sorting"));

const Base64 = lazy(() => import("pages/Converter/Base64"));
const PixelConverter = lazy(() => import("pages/Converter/PixelConverter"));

const TextEditor = lazy(() => import("pages/Text/TextEditor"));

const Icon = lazy(() => import("pages/List/Icon/Icon"));
const YouTube = lazy(() => import("pages/List/YouTube/Youtube"));
const Github = lazy(() => import("pages/List/Github/Github"));

export {
	News,
	ColorPicker,
	Shades,
	MarkdownEditor,
	TableOfContent,
	TableGenerator,
	ImageGeneratorFromColors,
	DataGenerator,
	Sorting,
	Base64,
	PixelConverter,
	TextEditor,
	Icon,
	YouTube,
	Github,
};
