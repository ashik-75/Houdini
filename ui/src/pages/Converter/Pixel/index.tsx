import { useState } from "react";
import { Card, Form } from "antd";
import CopyInput from "components/Layouts/CopyInput";
import Clipboard from "components/RenderProps/Clipboard";
import ClipboardButton from "components/General/ClipboardButton";
import PageGrid from "components/Layouts/PageGrid";
import { ResponsiveInputWithLabel } from "components/General/FormComponents";

const Pixel: React.FC = () => {
	const [pixel, setPixel] = useState(0);
	const [rem, setRem] = useState(0);
	const [base, setBase] = useState(16);

	return (
		<PageGrid>
			<Card bordered={false}>
				<Form layout="vertical">
					<CopyInput>
						<ResponsiveInputWithLabel
							label="Pixels"
							tooltip="This is a required field"
							value={pixel}
							placeholder="Enter pixel value"
							onChange={(px) => {
								if (px) {
									setPixel(px);
									setRem(px / base);
								} else {
									setPixel(0);
									setRem(0);
								}
							}}
							precision={2}
							min={0}
							type="number"
						/>
						<Clipboard
							text={`${pixel}`}
							clipboardComponent={ClipboardButton}
						/>
					</CopyInput>

					<CopyInput>
						<ResponsiveInputWithLabel
							label="REM"
							placeholder="Enter rem value"
							tooltip="This is a required field"
							value={rem}
							onChange={(rem) => {
								if (rem) {
									setRem(rem);
									setPixel(rem * base);
								} else {
									setRem(0);
									setPixel(0);
								}
							}}
							precision={2}
							min={0}
							type="number"
						/>
						<Clipboard
							text={`${pixel}`}
							clipboardComponent={ClipboardButton}
						/>
					</CopyInput>

					<ResponsiveInputWithLabel
						label="Base font size"
						tooltip="This is a required field"
						placeholder="Enter base font size"
						value={base}
						onChange={(base: number | null) => {
							if (base) {
								setBase(base);
								setRem(pixel / base);
							}
						}}
						precision={2}
						min={0}
						type="number"
					/>
				</Form>
			</Card>
		</PageGrid>
	);
};

export default Pixel;
