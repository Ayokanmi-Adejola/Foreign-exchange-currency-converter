"use client";

import useSWR from "swr";
import { FX_API } from "@/constants/frankfurter";
import type { ILatestRatesResponse } from "@/types";

interface IRawRate {
	date: string;
	base: string;
	quote: string;
	rate: number;
}

// /v2/rates returns a raw JSON array — NOT wrapped in { value: [...] }
async function fetcher(url: string): Promise<ILatestRatesResponse> {
	const res = await fetch(url);
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	const pairs: IRawRate[] = await res.json();

	const rates: { [code: string]: number } = {};
	let date = "";
	let base = "";

	for (const p of pairs) {
		rates[p.quote] = p.rate;
		date = p.date;
		base = p.base;
	}

	return { amount: 1, base, date, rates };
}

export default function useLatestRates(base: string, quotes?: string[]) {
	const { data, error, isLoading } = useSWR<ILatestRatesResponse>(
		FX_API.latest(base, quotes),
		fetcher,
		{ refreshInterval: 60_000 },
	);

	return { data, error, isLoading };
}
