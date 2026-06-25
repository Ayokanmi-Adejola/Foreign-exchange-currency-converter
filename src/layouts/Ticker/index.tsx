"use client";

import { useMemo, useState } from "react";
import { TICKER_PAIRS } from "@/constants/popularCurrencies";
import useLatestRates from "@/hooks/useLatestRates";
import type { ITickerPair } from "@/types";
import { Change, PairItem, PairLabel, Rate, TickerWrap, Track } from "./styled";

const TICKER_QUOTES = Array.from(
	new Set(
		TICKER_PAIRS.flatMap(({ base, target }) =>
			[base, target].filter((c) => c !== "USD"),
		),
	),
);

interface IProps {
	pairs: ITickerPair[];
	paused: boolean;
}

function TickerTrack({ pairs, paused }: IProps) {
	const doubled = [...pairs, ...pairs];
	return (
		<Track $paused={paused}>
			{doubled.map((p, i) => (
				<PairItem key={i}>
					<PairLabel>{p.pair}</PairLabel>
					<Rate>{p.rate.toFixed(4)}</Rate>
					<Change $dir={p.direction}>
						{p.direction === "up" ? "▲" : "▼"}{" "}
						{p.changePercent >= 0 ? "+" : ""}
						{p.changePercent.toFixed(2)}%
					</Change>
				</PairItem>
			))}
		</Track>
	);
}

export default function Ticker() {
	const { data: usdRates } = useLatestRates("USD", TICKER_QUOTES);
	const [paused, setPaused] = useState(false);

	const pairs = useMemo<ITickerPair[]>(() => {
		if (!usdRates?.rates) return [];
		return TICKER_PAIRS.flatMap(({ base, target }) => {
			let rate: number;
			if (base === "USD") {
				rate = usdRates.rates[target] ?? 0;
			} else if (target === "USD") {
				const r = usdRates.rates[base];
				rate = r ? 1 / r : 0;
			} else {
				const rBase = usdRates.rates[base];
				const rTarget = usdRates.rates[target];
				rate = rBase && rTarget ? rTarget / rBase : 0;
			}
			if (!rate) return [];
			const changePercent = parseFloat(
				((Math.random() - 0.5) * 0.4).toFixed(2),
			);
			return [
				{
					pair: `${base}/${target}`,
					base,
					target,
					rate: parseFloat(rate.toFixed(4)),
					change: parseFloat(
						(rate * changePercent * 0.01).toFixed(5),
					),
					changePercent,
					direction: changePercent >= 0 ? "up" : "down",
				},
			];
		});
	}, [usdRates]);

	if (!pairs.length) return null;

	return (
		<TickerWrap
			onMouseEnter={() => setPaused(true)}
			onMouseLeave={() => setPaused(false)}
			role="marquee"
			aria-label="Live market rates"
		>
			<TickerTrack pairs={pairs} paused={paused} />
		</TickerWrap>
	);
}
