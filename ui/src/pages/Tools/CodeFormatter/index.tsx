import React, { useState } from "react";
import style from "./CodeFormatter.module.scss";
import PageGrid from "components/Layouts/PageGrid";
import { Card, Form, Space } from "antd";
import {
	ResponsiveButton,
	ResponsiveSelectWithLabel,
} from "components/General/FormComponents";
import CodeHighlightWithCopy from "components/General/CodeHighlightWithCopy";
import Warning from "components/General/Warning";
import InputGrid from "components/Layouts/InputGrid";
import {
	BEAUTIFY_FUNCTIONS,
	INDENTATION_LEVEL,
	INPUT_TYPE,
} from "./utils/constants";
import CodeEditor from "components/General/CodeEditor";

const CodeFormatter: React.FC = () => {
	const [inputCode, setInputCode] = useState("");
	const [formattedCode, setFormattedCode] = useState("");
	const [indentationLevel, setIndentationLevel] = useState(
		INDENTATION_LEVEL[3].value
	);
	const [inputType, setInputType] = useState(INPUT_TYPE[3].value);

	const formatCode = () => {
		try {
			const options = {
				indent_size: indentationLevel,
				indent_with_tabs: indentationLevel === "tab" ? true : false,
				e4x: true,
			};

			const selectedBeautifyFunction =
				BEAUTIFY_FUNCTIONS[inputType] || BEAUTIFY_FUNCTIONS.default;

			const formatted = selectedBeautifyFunction(inputCode, options);

			setFormattedCode(formatted);
		} catch (error) {
			setFormattedCode(
				"Error formatting code. Check the console for details."
			);
		}
	};

	return (
		<PageGrid className={style.codeformatter}>
			<Card className={style.codeformatter__input}>
				<Form layout="vertical">
					<InputGrid>
						<ResponsiveSelectWithLabel
							label="Input Type"
							value={inputType}
							defaultActiveFirstOption
							onSelect={(value) => {
								setInputType(value);
							}}
							options={INPUT_TYPE}
						/>
						<ResponsiveSelectWithLabel
							label="Indentation level"
							value={indentationLevel}
							defaultActiveFirstOption
							onSelect={(value) => {
								setIndentationLevel(value);
							}}
							options={INDENTATION_LEVEL}
						/>
					</InputGrid>

					<CodeEditor
						code={inputCode}
						handleCode={(value) => setInputCode(value || "")}
						language={inputType}
						label="Enter code"
					/>

					<Space>
						<ResponsiveButton
							onClick={formatCode}
							disabled={inputCode.length === 0 || !inputType}
						>
							Format
						</ResponsiveButton>
					</Space>
				</Form>
			</Card>

			<Card className={style.codeformatter__output}>
				{formattedCode.toString().length > 0 ? (
					<CodeHighlightWithCopy
						codeString={formattedCode.toString()}
						language={inputType}
					/>
				) : (
					<div className={style.codeformatter__output_warning}>
						<Warning text="There is no data for the selected type, please provide data first." />
					</div>
				)}
			</Card>
		</PageGrid>
	);
};

export default CodeFormatter;
