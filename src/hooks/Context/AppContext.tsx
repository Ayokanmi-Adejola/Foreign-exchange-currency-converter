"use client";

import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import type {
	IActiveTab,
	IChartRange,
	IFavoritePair,
	ILogEntry,
	ITheme,
} from "@/types";

interface IAppContext {
	sendCurrency: string;
	setSendCurrency: (c: string) => void;
	receiveCurrency: (c: string) => void;
	swapCurrencies: () => void;
	baseCurrency: string;
	targetCurrency: string;

	amount: string;
	setAmount: (a: string) => void;

	activeTab: IActiveTab;
	setActiveTab: (t: IActiveTab) => void;

	chartRange: IChartRange;
	setChartRange: (r: IChartRange) => void;

	favorites: IFavoritePair[];
	isFavorite: (base: string, target: string) => boolean;
	toggleFavorite: (base: string, target: string) => void;

	log: ILogEntry[];
	addLogEntry: (entry: Omit<ILogEntry, "id" | "timestamp">) => void;
	deleteLogEntry: (id: string) => void;
	clearLog: () => void;

	theme: ITheme;
	toggleTheme: () => void;
}

const AppContextProvider = createContext<IAppContext>({} as IAppContext);

export function AppProvider({ children }: { children: ReactNode }) {
	const [baseCurrency, setBaseCurrency] = useState("USD");
	const [targetCurrency, setTargetCurrency] = useState("EUR");
	const [amount, setAmount] = useState("1000");
	const [activeTab, setActiveTab] = useLocalStorage<IActiveTab>(
		"fx-active-tab",
		"history",
	);
	const [chartRange, setChartRange] = useState<IChartRange>("1m");
	const [favorites, setFavorites] = useLocalStorage<IFavoritePair[]>(
		"fx-favorites",
		[],
	);
	const [log, setLog] = useLocalStorage<ILogEntry[]>("fx-log", []);
	const [theme, setTheme] = useLocalStorage<ITheme>("fx-theme", "dark");

	useEffect(() => {
		document.documentElement.dataset.theme = theme;
	}, [theme]);

	const setSendCurrency = useCallback((c: string) => setBaseCurrency(c), []);
	const receiveTargetCurrency = useCallback(
		(c: string) => setTargetCurrency(c),
		[],
	);

	const swapCurrencies = useCallback(() => {
		const prevBase = baseCurrency;
		const prevTarget = targetCurrency;
		setBaseCurrency(prevTarget);
		setTargetCurrency(prevBase);
	}, [baseCurrency, targetCurrency]);

	const isFavorite = useCallback(
		(base: string, target: string) =>
			favorites.some((f) => f.base === base && f.target === target),
		[favorites],
	);

	const toggleFavorite = useCallback(
		(base: string, target: string) => {
			setFavorites((prev) => {
				const exists = prev.some(
					(f) => f.base === base && f.target === target,
				);
				return exists
					? prev.filter(
							(f) => !(f.base === base && f.target === target),
						)
					: [...prev, { base, target }];
			});
		},
		[setFavorites],
	);

	const addLogEntry = useCallback(
		(entry: Omit<ILogEntry, "id" | "timestamp">) => {
			const newEntry: ILogEntry = {
				...entry,
				id: Math.random().toString(36).slice(2),
				timestamp: Date.now(),
			};
			setLog((prev) => [newEntry, ...prev].slice(0, 50));
		},
		[setLog],
	);

	const deleteLogEntry = useCallback(
		(id: string) => {
			setLog((prev) => prev.filter((e) => e.id !== id));
		},
		[setLog],
	);

	const clearLog = useCallback(() => setLog([]), [setLog]);

	const toggleTheme = useCallback(() => {
		setTheme((prev) => (prev === "dark" ? "light" : "dark"));
	}, [setTheme]);

	const value = useMemo<IAppContext>(
		() => ({
			sendCurrency: baseCurrency,
			setSendCurrency,
			receiveCurrency: receiveTargetCurrency,
			swapCurrencies,
			baseCurrency,
			targetCurrency,
			amount,
			setAmount,
			activeTab,
			setActiveTab,
			chartRange,
			setChartRange,
			favorites,
			isFavorite,
			toggleFavorite,
			log,
			addLogEntry,
			deleteLogEntry,
			clearLog,
			theme,
			toggleTheme,
		}),
		[
			baseCurrency,
			targetCurrency,
			amount,
			activeTab,
			chartRange,
			favorites,
			log,
			setSendCurrency,
			receiveTargetCurrency,
			swapCurrencies,
			isFavorite,
			toggleFavorite,
			addLogEntry,
			deleteLogEntry,
			clearLog,
			setActiveTab,
			theme,
			toggleTheme,
		],
	);

	return (
		<AppContextProvider.Provider value={value}>
			{children}
		</AppContextProvider.Provider>
	);
}

export function useAppContext() {
	return useContext(AppContextProvider);
}
