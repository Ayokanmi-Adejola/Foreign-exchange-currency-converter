"use client";

import useSWRImmutable from "swr/immutable";
import { FX_API } from "@/constants/frankfurter";
import type { ICurrencyMap } from "@/types";

// Frankfurter v2 /currencies returns an array of currency objects:
// [{ iso_code, iso_numeric, name, symbol, start_date, end_date }, ...]
// Transform it to the flat { code: name } map used throughout the app.
interface IRawCurrency {
	iso_code: string;
	name: string;
	[key: string]: unknown;
}

async function fetcher(url: string): Promise<ICurrencyMap> {
	const raw = await fetch(url).then((r) => r.json());

	// v2 returns an array
	if (Array.isArray(raw)) {
		return raw.reduce<ICurrencyMap>((acc, c: IRawCurrency) => {
			if (c.iso_code) acc[c.iso_code] = c.name ?? c.iso_code;
			return acc;
		}, {});
	}

	// v1 / fallback: already a { code: name } object
	return raw as ICurrencyMap;
}

export default function useCurrencies() {
	const { data, error, isLoading } = useSWRImmutable<ICurrencyMap>(
		FX_API.currencies(),
		fetcher,
	);

	return { data: data ?? {}, error, isLoading };
}
