import {
	MAX_SHADES,
	MIN_SHADES,
	OUTPUT_FORMAT,
	SEGMENTED_OPTIONS,
} from "pages/Colors/ShadesAndTints/utils/constants";
import { Card, Form, Space } from "antd";
import Clipboard from "components/RenderProps/Clipboard";
import ClipboardButton from "components/General/ClipboardButton";
import {
	formatShades,
	generateRandomColor,
} from "pages/Colors/ShadesAndTints/utils/helper";
import Icon from "components/General/Icon";
import { useEffect, useState } from "react";
import {
	ResponsiveButton,
	ResponsiveInputWithLabel,
	ResponsiveSegementWithLabel,
	ResponsiveSelectWithLabel,
} from "components/General/FormComponents";
import ColorPickerWithInput from "components/General/ColorPickerWithInput";
import { ChangeEvent } from "react";
import { SelectOption } from "pages/Colors/ShadesAndTints/utils/types";

interface ColorInputsProps {
	color: string;
	handleColorChange: (event: ChangeEvent<HTMLInputElement>) => void;
	handlePercentageChange: (value: number | null) => void;
	setColor: (color: string) => void;
	percentage: number;
	handleOutputFormatChange: (option: SelectOption) => void;
	option: SelectOption;
	shades: string[];
	tints: string[];
}

const ColorInputs: React.FC<ColorInputsProps> = ({
	color,
	handleColorChange,
	handlePercentageChange,
	setColor,
	percentage,
	handleOutputFormatChange,
	option,
	shades,
	tints,
}) => {
	const [order, setOrder] = useState(SEGMENTED_OPTIONS[0].value);
	const [clipboardText, setClipboardText] = useState("");

	useEffect(() => {
		const generateClipboardText = () => {
			if (order === "Shades") {
				setClipboardText(formatShades(shades, option));
			} else if (order === "Tints") {
				setClipboardText(formatShades(tints, option));
			} else if (order === "All") {
				setClipboardText(formatShades([...shades, ...tints], option));
			}
		};

		generateClipboardText();
	}, [order, option, shades, tints]);

	return (
		<Card>
			<Form layout="vertical">
				<Space align="end">
					<ColorPickerWithInput
						value={color}
						setValue={handleColorChange}
						setColor={setColor}
						label="Color"
					/>
					<ResponsiveInputWithLabel
						value={percentage}
						label="Percentage"
						onChange={handlePercentageChange}
						placeholder="Shades"
						precision={0}
						step={1}
						min={MIN_SHADES}
						max={MAX_SHADES}
						type="number"
						style={{ width: 90 }}
					/>

					<ResponsiveSelectWithLabel
						label="Output separator"
						value={option.value}
						onSelect={(_, option) =>
							handleOutputFormatChange(option)
						}
						options={OUTPUT_FORMAT}
						defaultActiveFirstOption
					/>

					<ResponsiveSegementWithLabel
						value={order}
						onChange={(value: string | number) =>
							setOrder(value as string)
						}
						options={SEGMENTED_OPTIONS}
					/>

					<Form.Item>
						<Clipboard
							text={clipboardText}
							clipboardComponent={ClipboardButton}
						/>
					</Form.Item>

					<Form.Item>
						<ResponsiveButton
							icon={<Icon name="RefreshCcw" />}
							onClick={() => setColor(generateRandomColor())}
						/>
					</Form.Item>
				</Space>
			</Form>
		</Card>
	);
};

export default ColorInputs;
