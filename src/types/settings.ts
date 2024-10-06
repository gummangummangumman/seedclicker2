export interface Settings {
	theme: string;
	formatting: NumberFormatting;
	itemView: ItemView;
}

export enum Theme {
	System = 'System',
	Light = 'theme-light',
	Dark = 'theme-dark',
}

export enum NumberFormatting {
	Normal = 'Normal',
	Engineering = 'Engineering',
}

export enum ItemView {
	Picture = 'Picture',
	NoPicture = 'NoPicture',
}

export const initialSettings: Settings = {
	theme: '',
	formatting: NumberFormatting.Normal,
	itemView: ItemView.Picture,
};
