"use client";

import { useMemo } from "react";
import { COMPARE_CURRENCIES, FLAG_MAP } from "@/constants/popularCurrencies";
import { useAppContext } from "@/hooks/Context/AppContext";
import useCurrencies from "@/hooks/useCurrencies";
import useLatestRates from "@/hooks/useLatestRates";
import {
	CompareHeader,
	CompareList,
	CompareRow,
	CompareSub,
	CompareTitle,
	Converted,
	CurrencyCode,
	CurrencyInfo,
	CurrencyName,
	EmptyState,
	FlagFallback,
	FlagImg,
	PinBtn,
	RefRate,
	StarIcon,
	Wrap,
} from "./styled";

function CurrencyFlag({ code }: { code: string }) {
	const iso = FLAG_MAP[code];
	if (!iso) return <FlagFallback />;
	return <FlagImg src={`/assets/images/flags/${iso}.webp`} alt={code} />;
}

function formatConverted(n: number): string {
	if (!Number.isFinite(n)) return "—";
	if (n >= 1000)
		return n.toLocaleString("en-US", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});
	return n.toFixed(n < 1 ? 4 : 2);
}

export default function CompareTab() {
	const { baseCurrency, amount, isFavorite, toggleFavorite } =
		useAppContext();
	const { data: ratesData } = useLatestRates(baseCurrency);
	const { data: currencies } = useCurrencies();

	const numericAmount = useMemo(() => {
		const n = parseFloat(amount.replace(/,/g, ""));
		return Number.isNaN(n) ? 0 : n;
	}, [amount]);

	const rows = useMemo(() => {
		if (!ratesData?.rates) return [];
		return COMPARE_CURRENCIES.filter(
			(c) => c !== baseCurrency && ratesData.rates[c],
		).map((c) => ({
			code: c,
			name: currencies[c] ?? c,
			rate: ratesData.rates[c],
			converted: numericAmount * (ratesData.rates[c] ?? 0),
		}));
	}, [ratesData, baseCurrency, numericAmount, currencies]);

	if (!numericAmount) {
		return (
			<EmptyState>
				<h3>No comparison available</h3>
				<p>
					Enter an amount in Send above to see what your money is
					worth in other currencies.
				</p>
			</EmptyState>
		);
	}

	return (
		<Wrap>
			<CompareHeader>
				<div>
					<CompareTitle>Multi-currency</CompareTitle>
					<CompareSub>
						{numericAmount.toLocaleString("en-US")} from{" "}
						{baseCurrency} · {rows.length} pairs
					</CompareSub>
				</div>
			</CompareHeader>
			<CompareList role="list" aria-label="Currency comparisons">
				{rows.map((row) => {
					const pinned = isFavorite(baseCurrency, row.code);
					return (
						<CompareRow key={row.code} role="listitem">
							<CurrencyFlag code={row.code} />
							<CurrencyInfo>
								<CurrencyCode>{row.code}</CurrencyCode>
								<CurrencyName>{row.name}</CurrencyName>
							</CurrencyInfo>
							<Converted>
								{formatConverted(row.converted)}
							</Converted>
							<RefRate>@ {row.rate.toFixed(4)}</RefRate>
							<PinBtn
								$active={pinned}
								onClick={() =>
									toggleFavorite(baseCurrency, row.code)
								}
								aria-label={
									pinned
										? `Unpin ${baseCurrency}/${row.code}`
										: `Pin ${baseCurrency}/${row.code}`
								}
								aria-pressed={pinned}
							>
								<StarIcon
									src={
										pinned
											? "/assets/images/icon-star-filled.svg"
											: "/assets/images/icon-star.svg"
									}
									alt=""
								/>
							</PinBtn>
						</CompareRow>
					);
				})}
			</CompareList>
		</Wrap>
	);
}
