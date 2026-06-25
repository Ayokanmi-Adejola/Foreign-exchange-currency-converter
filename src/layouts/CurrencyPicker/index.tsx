"use client";

import {
	useState,
	useEffect,
	useRef,
	useMemo,
	useCallback,
	type KeyboardEvent,
} from "react";
import useCurrencies from "@/hooks/useCurrencies";
import { POPULAR_CURRENCY_CODES, FLAG_MAP } from "@/constants/popularCurrencies";
import {
	Overlay,
	Popover,
	SearchWrap,
	SearchIcon,
	SearchInput,
	List,
	GroupLabel,
	GroupCount,
	CurrencyRow,
	FlagImg,
	FlagFallback,
	CurrencyCode,
	CurrencyName,
	CheckIcon,
} from "./styled";

function Flag({ code }: { code: string }) {
	const iso = FLAG_MAP[code];
	if (!iso) return <FlagFallback />;
	return (
		<FlagImg
			src={`/assets/images/flags/${iso}.webp`}
			alt={code}
			onError={(e) => {
				(e.currentTarget as HTMLImageElement).style.display = "none";
			}}
		/>
	);
}

interface IProps {
	selected: string;
	onSelect: (code: string) => void;
	onClose: () => void;
}

export default function CurrencyPicker({ selected, onSelect, onClose }: IProps) {
	const { data: currencies } = useCurrencies();
	const [query, setQuery] = useState("");
	const [focusedIndex, setFocusedIndex] = useState(-1);
	const searchRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		searchRef.current?.focus();
	}, []);

	const allCodes = useMemo(
		() => Object.keys(currencies).sort(),
		[currencies],
	);

	const popularCodes = useMemo(
		() => POPULAR_CURRENCY_CODES.filter((c) => currencies[c]),
		[currencies],
	);

	const filtered = useMemo(() => {
		const q = query.toLowerCase().trim();
		if (!q) return allCodes;
		return allCodes.filter(
			(c) =>
				c.toLowerCase().includes(q) ||
				(currencies[c] ?? "").toLowerCase().includes(q),
		);
	}, [query, allCodes, currencies]);

	const filteredPopular = useMemo(
		() => (query ? filtered.filter((c) => popularCodes.includes(c)) : popularCodes),
		[query, filtered, popularCodes],
	);

	const filteredOther = useMemo(
		() =>
			query
				? filtered.filter((c) => !popularCodes.includes(c))
				: allCodes.filter((c) => !popularCodes.includes(c)),
		[query, filtered, popularCodes, allCodes],
	);

	const flatList = useMemo(
		() => [...filteredPopular, ...filteredOther],
		[filteredPopular, filteredOther],
	);

	const activeId =
		focusedIndex >= 0 && flatList[focusedIndex]
			? `picker-option-${flatList[focusedIndex]}`
			: undefined;

	// Scroll focused option into view
	useEffect(() => {
		if (!activeId) return;
		document.getElementById(activeId)?.scrollIntoView({ block: "nearest" });
	}, [activeId]);

	const handleKey = useCallback(
		(e: KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "ArrowDown") {
				e.preventDefault();
				setFocusedIndex((i) => Math.min(i + 1, flatList.length - 1));
			} else if (e.key === "ArrowUp") {
				e.preventDefault();
				setFocusedIndex((i) => Math.max(i - 1, 0));
			} else if (e.key === "Enter" && focusedIndex >= 0) {
				onSelect(flatList[focusedIndex]);
				onClose();
			} else if (e.key === "Escape") {
				onClose();
			}
		},
		[flatList, focusedIndex, onSelect, onClose],
	);

	const handleSelect = useCallback(
		(code: string) => {
			onSelect(code);
			onClose();
		},
		[onSelect, onClose],
	);

	return (
		<>
			<Overlay onClick={onClose} aria-hidden />
			<Popover role="dialog" aria-label="Select currency" aria-modal>
				<SearchWrap>
					<SearchIcon src="/assets/images/icon-search.svg" alt="" />
					<SearchInput
						ref={searchRef}
						role="combobox"
						aria-expanded
						aria-haspopup="listbox"
						aria-controls="picker-listbox"
						aria-activedescendant={activeId}
						placeholder="Search currencies..."
						value={query}
						onChange={(e) => {
							setQuery(e.target.value);
							setFocusedIndex(-1);
						}}
						onKeyDown={handleKey}
						aria-label="Search currencies"
					/>
				</SearchWrap>
				<List id="picker-listbox" role="listbox" aria-label="Currencies">
					{!query && (
						<>
							<GroupLabel>
								Popular <GroupCount>{filteredPopular.length}</GroupCount>
							</GroupLabel>
							{filteredPopular.map((code, i) => (
								<CurrencyRow
									key={code}
									id={`picker-option-${code}`}
									role="option"
									aria-selected={code === selected}
									$selected={code === selected}
									$focused={focusedIndex === i}
									onClick={() => handleSelect(code)}
								>
									<Flag code={code} />
									<CurrencyCode>{code}</CurrencyCode>
									<CurrencyName>{currencies[code]}</CurrencyName>
									{code === selected && (
										<CheckIcon src="/assets/images/icon-check.svg" alt="Selected" />
									)}
								</CurrencyRow>
							))}
							<GroupLabel>
								Other currencies{" "}
								<GroupCount>{filteredOther.length}</GroupCount>
							</GroupLabel>
						</>
					)}
					{(query ? flatList : filteredOther).map((code, i) => {
						const idx = query ? i : filteredPopular.length + i;
						return (
							<CurrencyRow
								key={code}
								id={`picker-option-${code}`}
								role="option"
								aria-selected={code === selected}
								$selected={code === selected}
								$focused={focusedIndex === idx}
								onClick={() => handleSelect(code)}
							>
								<Flag code={code} />
								<CurrencyCode>{code}</CurrencyCode>
								<CurrencyName>{currencies[code]}</CurrencyName>
								{code === selected && (
									<CheckIcon src="/assets/images/icon-check.svg" alt="Selected" />
								)}
							</CurrencyRow>
						);
					})}
				</List>
			</Popover>
		</>
	);
}
