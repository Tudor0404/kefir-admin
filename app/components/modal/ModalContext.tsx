import React, { createContext, useContext, useReducer, ReactNode } from "react";

interface ModalContextType {
	showModal: (
		content: ReactNode,
		title?: string,
		buttonText?: string,
		okAction?: () => any,
		cancelAction?: () => any,
		okText?: string,
		cancelText?: string
	) => void;
	hideModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function useModal() {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error("useModal must be used within a ModalProvider");
	}
	return context;
}

interface ModalProviderProps {
	children: ReactNode;
}

interface ModalState {
	isOpen: boolean;
	content: ReactNode | null;
	title?: string;
	buttonText?: string;
	okAction?: () => any;
	cancelAction?: () => any;
	okText?: string;
	cancelText?: string;
}

type ModalAction =
	| { type: "SHOW_MODAL"; payload: Partial<ModalState> }
	| { type: "HIDE_MODAL" };

function modalReducer(state: ModalState, action: ModalAction): ModalState {
	switch (action.type) {
		case "SHOW_MODAL":
			return { ...state, ...action.payload, isOpen: true };
		case "HIDE_MODAL":
			return {
				isOpen: false,
				content: null,
				title: undefined,
				buttonText: undefined,
				okAction: undefined,
				cancelAction: undefined,
				okText: undefined,
				cancelText: undefined,
			};
		default:
			return state;
	}
}

export function ModalProvider({ children }: ModalProviderProps) {
	const [state, dispatch] = useReducer(modalReducer, {
		isOpen: false,
		content: null,
	});

	const showModal = (
		content: ReactNode,
		title?: string,
		buttonText?: string,
		okAction?: () => any,
		cancelAction?: () => any,
		okText?: string,
		cancelText?: string
	) => {
		dispatch({
			type: "SHOW_MODAL",
			payload: {
				content,
				title,
				buttonText,
				okAction,
				cancelAction,
				okText,
				cancelText,
			},
		});
	};

	const hideModal = () => {
		dispatch({ type: "HIDE_MODAL" });
	};

	return (
		<ModalContext.Provider value={{ showModal, hideModal }}>
			{children}
			{state.isOpen && (
				<dialog
					className="modal modal-bottom sm:modal-middle bg-black/30"
					open
					onClose={hideModal}
				>
					<div className="modal-box">
						{state.title && (
							<h3 className="font-bold text-lg mb-4">
								{state.title}
							</h3>
						)}
						{state.content}
						<div className="modal-action">
							<form
								className="flex flex-row gap-2"
								method="dialog "
								onSubmit={(e) => {
									e.preventDefault();
									dispatch({ type: "HIDE_MODAL" });
								}}
							>
								{state.okAction && (
									<button
										className="btn btn-sm btn-success"
										type="submit"
										onClick={() => {
											if (state.okAction)
												state.okAction();
										}}
									>
										{state.okText || "Ok"}
									</button>
								)}
								{state.cancelAction && (
									<button
										className="btn btn-sm btn-error"
										type="submit"
										onClick={() => {
											if (state.cancelAction)
												state.cancelAction();
										}}
									>
										{state.cancelText || "Cancel"}
									</button>
								)}
								<button
									className="btn btn-sm"
									type="submit"
								>
									{state.buttonText || "Close"}
								</button>
							</form>
						</div>
					</div>
				</dialog>
			)}
		</ModalContext.Provider>
	);
}
