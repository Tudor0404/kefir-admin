import { useAlerts } from "./AlertContext";

type AlertType = "info" | "success" | "warning" | "error" | "";

const AlertHandler: React.FC = () => {
	const { alerts, removeAlert } = useAlerts();

	const getAlertBackground = (type: AlertType) => {
		switch (type) {
			case "info":
				return "alert-info";
			case "success":
				return "alert-success";
			case "warning":
				return "alert-warning";
			case "error":
				return "alert-error";
			default:
				return "";
		}
	};

	const getAlertText = (type: AlertType) => {
		switch (type) {
			case "info":
				return "text-info-content";
			case "success":
				return "text-success-content";
			case "warning":
				return "text-warning-content";
			case "error":
				return "text-error-content";
			default:
				return "";
		}
	};

	return (
		<div className="fixed bottom-0 right-0 w-full p-6 space-y-4 ">
			{alerts.map((alert) => (
				<div
					key={alert.id}
					className={`alert relative w-full flex justify-between items-center ${getAlertBackground(
						alert.type
					)}`}
				>
					<span
						className={`flex-1 text-lg ${getAlertText(alert.type)}`}
					>
						{alert.message}
					</span>
					<div className="flex flex-row gap-2">
						<button
							className="btn btn-sm"
							onClick={() => removeAlert(alert.id)}
						>
							Close
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default AlertHandler;
