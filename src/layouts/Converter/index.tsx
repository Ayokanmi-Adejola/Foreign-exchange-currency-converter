"use client";

import { useMemo, useState } from "react";
import { FLAG_MAP } from "@/constants/popularCurrencies";
import { useAppContext } from "@/hooks/Context/AppContext";
import useExchangeRate from "@/hooks/useExchangeRate";
import CurrencyPicker from "@/layouts/CurrencyPicker";
import {
	Actions,
	AmountBox,
	AmountInput,
	BoxBottom,
	BoxLabel,
	Card,
	ChevronIcon,
	CurrencyBtn,
	FavoriteBtn,
	FlagImg,
	LogBtn,
	MetaRow,
	PairRow,
	RateText,
	ResultAmount,
	Section,
	StarIcon,
	SwapBtn,
	SwapIcon,
	Title,
} from "./styled";

function formatAmount(n: number): string {
	if (!Number.isFinite(n)) return "—";
	if (n >= 1000)
		return n.toLocaleString("en-US", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});
	return n.toFixed(n < 1 ? 4 : 2);
}

function CurrencyFlag({ code }: { code: string }) {
	const iso = FLAG_MAP[code];
	if (!iso) return null;
	return <FlagImg src={`/assets/images/flags/${iso}.webp`} alt={code} />;
}

export default function Converter() {
	const {
		baseCurrency,
		targetCurrency,
		setSendCurrency,
		receiveCurrency,
		swapCurrencies,
		amount,
		setAmount,
		isFavorite,
		toggleFavorite,
		addLogEntry,
	} = useAppContext();

	const [pickerOpen, setPickerOpen] = useState<"base" | "target" | null>(
		null,
	);
	const { rate } = useExchangeRate(baseCurrency, targetCurrency);

	const numericAmount = useMemo(() => {
		const n = parseFloat(amount.replace(/,/g, ""));
		return Number.isNaN(n) ? 0 : n;
	}, [amount]);

	const converted = useMemo(() => {
		if (!rate || numericAmount === 0) return null;
		return numericAmount * rate;
	}, [numericAmount, rate]);

	const fav = isFavorite(baseCurrency, targetCurrency);

	const handleLog = () => {
		if (!rate || !converted) return;
		addLogEntry({
			base: baseCurrency,
			target: targetCurrency,
			amount: numericAmount,
			result: converted,
			rate,
		});
	};

	return (
		<Section>
			<Title>Check the rate</Title>
			<Card>
				<PairRow>
					<AmountBox>
						<BoxLabel htmlFor="send-amount">Send</BoxLabel>
						<BoxBottom>
							<AmountInput
								id="send-amount"
								type="number"
								inputMode="decimal"
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
								placeholder="0"
								aria-label="Amount to send"
							/>
							<CurrencyBtn
								onClick={() => setPickerOpen("base")}
								aria-label={`Select send currency, current: ${baseCurrency}`}
								aria-haspopup="dialog"
							>
								<CurrencyFlag code={baseCurrency} />
								{baseCurrency}
								<ChevronIcon
									src="/assets/images/icon-chevron-down.svg"
									alt=""
								/>
							</CurrencyBtn>
						</BoxBottom>
					</AmountBox>

					<SwapBtn
						onClick={swapCurrencies}
						aria-label="Swap send and receive currencies"
						title="Swap currencies"
					>
						<SwapIcon
							src="/assets/images/icon-exchange.svg"
							alt=""
						/>
					</SwapBtn>

					<AmountBox>
						<BoxLabel>Receive</BoxLabel>
						<BoxBottom>
							<ResultAmount
								aria-live="polite"
								aria-label={`Received amount: ${converted !== null ? formatAmount(converted) : "—"} ${targetCurrency}`}
							>
								{converted !== null
									? formatAmount(converted)
									: "—"}
							</ResultAmount>
							<CurrencyBtn
								onClick={() => setPickerOpen("target")}
								aria-label={`Select receive currency, current: ${targetCurrency}`}
								aria-haspopup="dialog"
							>
								<CurrencyFlag code={targetCurrency} />
								{targetCurrency}
								<ChevronIcon
									src="/assets/images/icon-chevron-down.svg"
									alt=""
								/>
							</CurrencyBtn>
						</BoxBottom>
					</AmountBox>
				</PairRow>

				<MetaRow>
					<RateText aria-live="polite">
						{rate != null
							? `1 ${baseCurrency} = ${rate.toFixed(4)} ${targetCurrency}`
							: "Loading rate…"}
					</RateText>
					<Actions>
						<FavoriteBtn
							$active={fav}
							onClick={() =>
								toggleFavorite(baseCurrency, targetCurrency)
							}
							aria-label={
								fav
									? "Remove from favorites"
									: "Add to favorites"
							}
							aria-pressed={fav}
						>
							<StarIcon
								src={
									fav
										? "/assets/images/icon-star-filled.svg"
										: "/assets/images/icon-star.svg"
								}
								alt=""
							/>
							{fav ? "Favorited" : "Favorite"}
						</FavoriteBtn>
						<LogBtn
							onClick={handleLog}
							aria-label="Log this conversion"
						>
							Log conversion
						</LogBtn>
					</Actions>
				</MetaRow>
			</Card>

			{pickerOpen && (
				<CurrencyPicker
					selected={
						pickerOpen === "base" ? baseCurrency : targetCurrency
					}
					onSelect={
						pickerOpen === "base"
							? setSendCurrency
							: receiveCurrency
					}
					onClose={() => setPickerOpen(null)}
				/>
			)}
		</Section>
	);
}
