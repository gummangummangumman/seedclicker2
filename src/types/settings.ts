export interface Settings {
	theme: string;
	formatting: NumberFormatting;
	itemView: ItemView;
}

export enum NumberFormatting {
	Normal = 'Normal',
	Engineering = 'Engineering 🥼',
}

export enum ItemView {
	Picture = 'Picture',
	NoPicture = 'NoPicture',
}

export const initialSettings = {
	theme: '',
	formatting: NumberFormatting.Normal,
	ItemView: ItemView.Picture,
};
