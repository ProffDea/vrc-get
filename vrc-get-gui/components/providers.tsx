"use client";

import { type LogEntry, environmentLanguage } from "@/lib/bindings";
import i18next from "@/lib/i18n";
import { toastError } from "@/lib/toast";
import { ThemeProvider } from "@material-tailwind/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { listen } from "@tauri-apps/api/event";
import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		let unlisten: (() => void) | undefined = undefined;
		let unlistened = false;

		listen("log", (event) => {
			const entry = event.payload as LogEntry;
			if (entry.level === "Error") {
				toastError(entry.message);
			}
		}).then((unlistenFn) => {
			if (unlistened) {
				unlistenFn();
			} else {
				unlisten = unlistenFn;
			}
		});

		return () => {
			unlisten?.();
			unlistened = true;
		};
	}, []);

	useEffect(() => {
		environmentLanguage().then((lang) => i18next.changeLanguage(lang));
	}, []);

	return (
		<>
			<ToastContainer
				position="bottom-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
				className={"whitespace-normal"}
			/>
			<QueryClientProvider client={queryClient}>
				<I18nextProvider i18n={i18next}>
					<ThemeProvider
						value={{
							Typography: {
								styles: {
									font: "normal",
								},
							},
						}}
					>
						{children as any}
					</ThemeProvider>
				</I18nextProvider>
			</QueryClientProvider>
		</>
	);
}
