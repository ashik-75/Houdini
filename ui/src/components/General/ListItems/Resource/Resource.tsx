import { Avatar, Card, Skeleton, Space, Tag, Typography } from "antd";
import style from "./resource.module.scss";
import { ListItemProps } from "components/Hoc/List/types";
import { ResourceType } from "./resource.type";
import Clipboard from "components/Hoc/Clipboard/Clipboard";
import ClipboardButton from "components/General/ClipboardButton/ClipboardButton";

const { Title } = Typography;

const Resource: React.FC<ListItemProps<ResourceType>> = ({ resource }) => {
	const { name, category, url } = resource;

	const FIRST_LETTER = name?.[0];

	return (
		<Card className={style.card} key={name} hoverable>
			<Skeleton loading={false} avatar active>
				<Space className={style.card__container}>
					<Space size={16}>
						<Avatar
							size={70}
							style={{ fontWeight: "bold", fontSize: "35px" }}
						>
							{FIRST_LETTER}
						</Avatar>
						<Space direction="vertical">
							<Title level={4}>{name}</Title>
							<Tag key={category}>{category}</Tag>
						</Space>
					</Space>

					<Clipboard
						text={url}
						clipboardComponent={ClipboardButton}
					/>
				</Space>
			</Skeleton>
		</Card>
	);
};

export default Resource;
