import { useState } from "react";
import style from "./TableOfContent.module.scss";
import { marked } from "marked";
import { Input, Form, Card } from "antd";
import useCombinedKeyPress from "lib/utils/hooks/useCombinedKeyPress";
import { TocItem } from "./utils/types";
import { indentMap } from "./utils/constants";
import CopyInput from "components/Layouts/CopyInput";
import InputComponent from "components/General/InputComponent";
import Clipboard from "components/RenderProps/Clipboard";
import ClipboardButton from "components/General/ClipboardButton";
import PageGrid from "components/Layouts/PageGrid";
const { TextArea } = Input;

const TableOfContent: React.FC = () => {
	const [url, setUrl] = useState("");
	const [markdown, setMarkdown] = useState("");
	const [tableOfContents, setTableOfContents] = useState<string>("");

	useCombinedKeyPress(
		() =>
			fetchData(
				"https://raw.githubusercontent.com/lifeparticle/JS-Cheatsheet/main/README.md"
			),
		["ControlLeft", "KeyE"]
	);
	useCombinedKeyPress(() => {
		setUrl("");
		setMarkdown("");
		setTableOfContents("");
	}, ["ControlLeft", "KeyR"]);

	const onMarkdownChange = (text: string) => {
		setMarkdown(text);
		const markdownHtml = marked.parse(text);
		const tempDiv = document.createElement("div");

		tempDiv.innerHTML = markdownHtml;
		const headings = [
			...tempDiv.querySelectorAll("h1, h2, h3, h4, h5, h6"),
		].map((el) => {
			return {
				tag: el.tagName as TocItem["tag"],
				text: el.textContent?.trim() ?? "",
			};
		});

		setTableOfContents(generateTableOfContentsText(headings));
	};

	const headingCounts: Record<string, number> = {};

	const getUniqueHeadingText = (text: string) => {
		if (headingCounts[text] >= 0) {
			headingCounts[text]++;
			return `${text}-${headingCounts[text]}`;
		} else {
			headingCounts[text] = 0;
			return text;
		}
	};

	const generateTocItem = (text: string) => {
		return `[${text}](#${getUniqueHeadingText(text)
			.toLowerCase()
			.replace(/\s/g, "-")
			.replace(/[^A-Za-z0-9-_]/g, "")})`;
	};

	const generateTableOfContentsText = (tableOfContents: TocItem[]) => {
		return tableOfContents
			.map((tocItem) => {
				return `${indentMap[tocItem.tag]}${generateTocItem(
					tocItem.text
				)}`;
			})
			.join("\n");
	};

	const fetchData = (url: string) => {
		setUrl(url);

		fetch(url)
			.then((res) => res.text())
			.then(
				(result) => {
					setMarkdown(result);
					onMarkdownChange(result);
				},
				(error) => {
					console.log(error);
				}
			);
	};

	return (
		<PageGrid>
			<Card>
				<Form layout="vertical">
					<CopyInput>
						<InputComponent
							label="Provide URL"
							placeholder="URL"
							value={url}
							onChange={(event) =>
								fetchData(event.currentTarget.value)
							}
							type="text"
						/>

						<Clipboard
							text={url}
							clipboardComponent={ClipboardButton}
						/>
					</CopyInput>
					<Form.Item label="Content">
						<TextArea
							placeholder=""
							value={markdown}
							onChange={(event) =>
								onMarkdownChange(event.currentTarget.value)
							}
							rows={20}
						/>
					</Form.Item>
				</Form>
			</Card>

			<Card>
				<Form layout="vertical" className={style.toc__output}>
					<Clipboard
						text={tableOfContents}
						clipboardComponent={ClipboardButton}
					/>

					<Form.Item label="Output">
						<TextArea value={tableOfContents} rows={20} />
					</Form.Item>
				</Form>
			</Card>
		</PageGrid>
	);
};

export default TableOfContent;
