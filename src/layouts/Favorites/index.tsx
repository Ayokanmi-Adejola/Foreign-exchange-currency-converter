"use client";

import { useMemo } from "react";
import { FLAG_MAP } from "@/constants/popularCurrencies";
import { useAppContext } from "@/hooks/Context/AppContext";
import useExchangeRate from "@/hooks/useExchangeRate";
import {
	ArrowIcon,
	Change,
	EmptyState,
	FavCount,
	FavHeader,
	FavList,
	FavRow,
	FavTitle,
	FlagFallback,
	FlagImg,
	FlagsStack,
	LiveRate,
	PairLabel,
	RateInfo,
	StarIcon,
	UnpinBtn,
	Wrap,
} from "./styled";

function Flag({ code, offset }: { code: string; offset?: boolean }) {
	const iso = FLAG_MAP[code];
	if (!iso) return <FlagFallback $offset={offset} />;
	return (
		<FlagImg
			src={`/assets/images/flags/${iso}.webp`}
			alt={code}
			$offset={offset}
		/>
	);
}

function FavRowItem({
	base,
	target,
	onLoad,
	onUnpin,
}: {
	base: string;
	target: string;
	onLoad: () => void;
	onUnpin: () => void;
}) {
	const { rate } = useExchangeRate(base, target);
	const changePercent = useMemo(() => (Math.random() - 0.48) * 0.6, []);
	const dir = changePercent >= 0 ? "up" : "down";

	return (
		<FavRow
			role="listitem"
			onClick={onLoad}
			tabIndex={0}
			aria-label={`Load ${base} to ${target} pair`}
			onKeyDown={(e) => e.key === "Enter" && onLoad()}
		>
			<FlagsStack>
				<Flag code={base} />
				<Flag code={target} offset />
			</FlagsStack>
			<PairLabel>
				{base}
				<ArrowIcon src="/assets/images/icon-arrow-right.svg" alt="to" />
				{target}
			</PairLabel>
			<RateInfo>
				<LiveRate>{rate != null ? rate.toFixed(4) : "—"}</LiveRate>
				<Change $dir={dir}>
					{dir === "up" ? "▲" : "▼"} {changePercent >= 0 ? "+" : ""}
					{changePercent.toFixed(2)}%
				</Change>
			</RateInfo>
			<UnpinBtn
				onClick={(e) => {
					e.stopPropagation();
					onUnpin();
				}}
				aria-label={`Unpin ${base}/${target}`}
			>
				<StarIcon src="/assets/images/icon-star-filled.svg" alt="" />
			</UnpinBtn>
		</FavRow>
	);
}

export default function FavoritesTab() {
	const {
		favorites,
		toggleFavorite,
		setSendCurrency,
		receiveCurrency,
		setActiveTab,
	} = useAppContext();

	const handleLoad = (base: string, target: string) => {
		setSendCurrency(base);
		receiveCurrency(target);
		setActiveTab("history");
	};

	if (!favorites.length) {
		return (
			<EmptyState>
				<h3>No pinned pairs yet</h3>
				<p>
					Pin a pair to track its rate here. Tap the star icon on any
					conversion or comparison row.
				</p>
			</EmptyState>
		);
	}

	return (
		<Wrap>
			<FavHeader>
				<div>
					<FavTitle>Pinned pairs</FavTitle>
					<FavCount>
						{favorites.length}{" "}
						{favorites.length === 1 ? "favorite" : "favorites"}
					</FavCount>
				</div>
			</FavHeader>
			<FavList role="list" aria-label="Pinned currency pairs">
				{favorites.map(({ base, target }) => (
					<FavRowItem
						key={`${base}-${target}`}
						base={base}
						target={target}
						onLoad={() => handleLoad(base, target)}
						onUnpin={() => toggleFavorite(base, target)}
					/>
				))}
			</FavList>
		</Wrap>
	);
}
