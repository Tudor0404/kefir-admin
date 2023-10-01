import { ReactNode, createContext, useContext, useState } from "react";

type AlertType = "info" | "success" | "warning" | "error";

interface Alert {
	message: string;
	type: AlertType;
	id: number;
}

interface AlertContextValue {
	alerts: Alert[];
	addAlert: (message: string, type: AlertType) => void;
	removeAlert: (id: number) => void;
}

const AlertContext = createContext<AlertContextValue | undefined>(undefined);

export const useAlerts = () => {
	const context = useContext(AlertContext);
	if (!context) {
		throw new Error("useAlerts must be used within an AlertProvider");
	}
	return context;
};

export function AlertProvider({ children }: { children: ReactNode }) {
	const [alerts, setAlerts] = useState<Alert[]>([]);

	const addAlert = (message: string, type: AlertType = "info") => {
		const id = Date.now();
		setAlerts((prev) => [...prev, { message, type, id }]);

		// Remove the alert after 3 seconds
		setTimeout(() => {
			removeAlert(id);
		}, 3000);
	};

	const removeAlert = (id: number) => {
		setAlerts((prev) => prev.filter((alert) => alert.id !== id));
	};

	return (
		<AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
			{children}
		</AlertContext.Provider>
	);
}
