export interface Settings {
	theme: string;
	formatting: NumberFormatting;
}

export enum NumberFormatting {
	Normal = 'Normal',
	Scientific = 'Scientific',
}

export const initialSettings = {
	theme: '',
	formatting: NumberFormatting.Normal,
};
