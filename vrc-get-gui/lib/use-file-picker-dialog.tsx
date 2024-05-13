import { tc } from "@/lib/i18n";
import { nop } from "@/lib/nop";
import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";
import { type ReactNode, useCallback, useState } from "react";

export function useFilePickerFunction<A extends unknown[], R>(
	f: (...args: A) => Promise<R>,
): [f: (...args: A) => Promise<R>, dialog: ReactNode] {
	const [isPicking, setIsPicking] = useState(false);
	const result = useCallback(
		async (...args: A) => {
			setIsPicking(true);
			try {
				return await f(...args);
			} finally {
				setIsPicking(false);
			}
		},
		[f],
	);

	const dialog = (
		<Dialog open={isPicking} handler={nop}>
			<DialogHeader>
				{tc("general:dialog:select file or directory header")}
			</DialogHeader>
			<DialogBody>{tc("general:dialog:select file or directory")}</DialogBody>
		</Dialog>
	);

	return [result, dialog];
}
