const BASE_URL = "https://api.frankfurter.dev/v2";

export const FX_API = {
	currencies: () => `${BASE_URL}/currencies`,

	// Returns { value: [{ date, base, quote, rate }, ...] }
	latest: (base: string, quotes?: string[]) =>
		quotes?.length
			? `${BASE_URL}/rates?base=${base}&quotes=${quotes.join(",")}`
			: `${BASE_URL}/rates?base=${base}`,

	// Single pair: { date, base, quote, rate }
	latestPair: (base: string, target: string) =>
		`${BASE_URL}/rate/${base}/${target}`,

	// History range: { value: [{ date, base, quote, rate }, ...] }
	history: (base: string, target: string, start: string, end: string) =>
		`${BASE_URL}/rates?base=${base}&quotes=${target}&from=${start}&to=${end}`,
};
