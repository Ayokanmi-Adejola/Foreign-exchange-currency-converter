export interface ICurrency {
	code: string;
	name: string;
}

export interface ICurrencyMap {
	[code: string]: string;
}

export interface IRate {
	base: string;
	target: string;
	rate: number;
}

export interface ITickerPair {
	pair: string;
	base: string;
	target: string;
	rate: number;
	change: number;
	changePercent: number;
	direction: "up" | "down";
}

export interface IHistoryPoint {
	date: string;
	rate: number;
}

export type IChartRange = "1d" | "1w" | "1m" | "3m" | "1y" | "5y";

export interface IHistoryData {
	open: number;
	last: number;
	change: number;
	changePercent: number;
	points: IHistoryPoint[];
}

export interface IFavoritePair {
	base: string;
	target: string;
}

export interface ILogEntry {
	id: string;
	timestamp: number;
	base: string;
	target: string;
	amount: number;
	result: number;
	rate: number;
}

export interface ICompareRow {
	code: string;
	name: string;
	converted: number;
	rate: number;
	isPinned: boolean;
}

export interface ILatestRatesResponse {
	amount: number;
	base: string;
	date: string;
	rates: { [code: string]: number };
}

export type IActiveTab = "history" | "compare" | "favorites" | "log";

export type ITheme = "dark" | "light";
