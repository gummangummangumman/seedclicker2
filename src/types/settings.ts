export interface Settings {
	theme: string;
	formatting: NumberFormatting;
}

export enum NumberFormatting {
	Normal = 'Normal',
	Engineering = 'Engineering',
}

export const initialSettings = {
	theme: '',
	formatting: NumberFormatting.Normal,
};
