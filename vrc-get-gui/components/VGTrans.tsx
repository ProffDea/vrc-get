import React from "react";
import { Trans, useTranslation } from "react-i18next";
import type { TransProps } from "react-i18next/TransWithoutContext";

export function VGTrans(props: TransProps<string>) {
	const { t } = useTranslation();

	return <Trans {...props} t={t} />;
}

export function tc(
	key: string | string[],
	values?: { [key: string]: string | number },
	props?: TransProps<string>,
) {
	return <VGTrans i18nKey={key} values={values} {...props} />;
}
