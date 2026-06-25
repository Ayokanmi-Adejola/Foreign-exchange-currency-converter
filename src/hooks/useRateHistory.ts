"use client";

import useSWR from "swr";
import { FX_API } from "@/constants/frankfurter";
import type { IChartRange, IHistoryData } from "@/types";

interface IRawRate {
	date: string;
	base: string;
	quote: string;
	rate: number;
}

function getDateRange(range: IChartRange): { start: string; end: string } {
	const end = new Date();
	end.setDate(end.getDate() - 1);
	const start = new Date(end);

	switch (range) {
		case "1d":
			start.setDate(start.getDate() - 5); // 5 days covers weekends; slice(-2) trims to 2 points
			break;
		case "1w":
			start.setDate(start.getDate() - 7);
			break;
		case "1m":
			start.setMonth(start.getMonth() - 1);
			break;
		case "3m":
			start.setMonth(start.getMonth() - 3);
			break;
		case "1y":
			start.setFullYear(start.getFullYear() - 1);
			break;
		case "5y":
			start.setFullYear(start.getFullYear() - 5);
			break;
	}

	return {
		start: start.toISOString().split("T")[0],
		end: end.toISOString().split("T")[0],
	};
}

// /v2/rates returns a raw JSON array — NOT wrapped in { value: [...] }
async function fetcher(url: string): Promise<IHistoryData> {
	const res = await fetch(url);
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	const raw: IRawRate[] = await res.json();

	const points = raw
		.sort((a, b) => a.date.localeCompare(b.date))
		.map((p) => ({ date: p.date, rate: p.rate }));

	if (points.length < 2) throw new Error("insufficient data");

	const open = points[0].rate;
	const last = points[points.length - 1].rate;
	const change = last - open;
	const changePercent = (change / open) * 100;

	return { open, last, change, changePercent, points };
}

export default function useRateHistory(
	base: string,
	target: string,
	range: IChartRange,
) {
	const { start, end } = getDateRange(range);
	const url =
		base !== target ? FX_API.history(base, target, start, end) : null;

	const { data, error, isLoading } = useSWR<IHistoryData>(url, fetcher, {
		revalidateOnFocus: false,
	});

	const displayed =
		data && range === "1d"
			? { ...data, points: data.points.slice(-2) }
			: data;

	return { data: displayed ?? null, error, isLoading };
}
