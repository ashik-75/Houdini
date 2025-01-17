import style from "components/General/Notification/Notification.module.scss";
import { Button, Skeleton } from "antd";
import { Typography, Tag, Dropdown } from "antd";
import Icon from "components/General/Icon";
import { classNames } from "utils/helper-functions/string";
import { NotificationListProps } from "components/General/Notification/utils/types";
const { Title } = Typography;

const NotificationList: React.FC<NotificationListProps> = ({
	notifications,
	isLoading,
	isError,
	handleRedFlagNotification,
	showRedFlag,
}) => {
	const renderNotificationItems = () => {
		if (isLoading) {
			return [
				{
					key: 1,
					label: <Skeleton active />,
				},
			];
		}

		if (isError) {
			return [
				{
					key: 1,
					label: (
						<div className={style.notification__error}>
							<Icon name="ShieldClose" color="red" />
							<p>Something went wrong!</p>
						</div>
					),
				},
			];
		}

		if (notifications && notifications.length === 0) {
			// Render a message when there are no notifications
			return [
				{
					key: 1,
					label: (
						<div className={style.notification__empty}>
							No notifications available.
						</div>
					),
				},
			];
		}

		// Render the notification items
		return notifications
			?.map((notification, index) => [
				{
					key: `item_${index}`,
					label: (
						<div
							key={notification.date}
							className={style.notification__item}
						>
							<div className={style.notification__item_title}>
								<Title level={5}>{notification.date}</Title>
								<Tag color="green">{notification.version}</Tag>
							</div>
							<ul className={style.notification__item_features}>
								{notification.features.map((feature) => (
									<li
										key={feature}
										className={
											style.notification__item_features_feature
										}
									>
										{feature}
									</li>
								))}
							</ul>
						</div>
					),
				},
				{
					type: "divider",
					key: `divider_${index}`,
				},
			])
			.flat();
	};

	return (
		<Dropdown
			menu={{ items: renderNotificationItems() }}
			placement="bottomRight"
			arrow={{ pointAtCenter: true }}
			overlayClassName={classNames(
				style.notification,
				"notification-container"
			)}
			onOpenChange={handleRedFlagNotification}
		>
			<Button className={style.notification__button}>
				<span
					className={
						showRedFlag ? style.notification__button__status : ""
					}
				></span>
				<Icon name="Bell" size={20} />
			</Button>
		</Dropdown>
	);
};

export default NotificationList;
