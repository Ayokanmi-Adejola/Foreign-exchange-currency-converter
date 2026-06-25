"use client";

import useSWR from "swr";
import { FX_API } from "@/constants/frankfurter";

interface IRawSingleRate {
	date: string;
	base: string;
	quote: string;
	rate: number;
}

async function fetcher(url: string): Promise<IRawSingleRate> {
	const res = await fetch(url);
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	return res.json();
}

export default function useExchangeRate(base: string, target: string) {
	const enabled = base && target && base !== target;

	const { data, error, isLoading } = useSWR<IRawSingleRate>(
		enabled ? FX_API.latestPair(base, target) : null,
		fetcher,
		{ refreshInterval: 60_000 },
	);

	return {
		rate: data?.rate ?? null,
		date: data?.date ?? null,
		error,
		isLoading,
	};
}
