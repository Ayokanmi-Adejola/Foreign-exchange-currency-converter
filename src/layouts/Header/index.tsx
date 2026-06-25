"use client";

import Image from "next/image";
import Ticker from "@/layouts/Ticker";
import useCurrencies from "@/hooks/useCurrencies";
import { useAppContext } from "@/hooks/Context/AppContext";
import {
	HeaderWrap,
	TopBar,
	Brand,
	RightGroup,
	Meta,
	MetaCount,
	Dot,
	TickerBar,
	LiveLabel,
	ThemeToggleBtn,
} from "./styled";

export default function Header() {
	const { data: currencies } = useCurrencies();
	const { theme, toggleTheme } = useAppContext();
	const count = Object.keys(currencies).length;

	return (
		<HeaderWrap>
			<TopBar>
				<Brand>
					<Image
						src="/assets/images/logo.svg"
						alt="Foreign Exchange Currency Converter"
						width={140}
						height={28}
						priority
					/>
				</Brand>
				<RightGroup>
					<Meta>
						<MetaCount>{count > 0 ? count : "55"} Currencies</MetaCount>
						<Dot>·</Dot>
						<span>EOD</span>
						<Dot>·</Dot>
						<span>ECB Data</span>
					</Meta>
					<ThemeToggleBtn
						onClick={toggleTheme}
						aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
						title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
					>
						{theme === "dark" ? "☀" : "☾"}
					</ThemeToggleBtn>
				</RightGroup>
			</TopBar>
			<TickerBar>
				<LiveLabel>Live markets</LiveLabel>
				<Ticker />
			</TickerBar>
		</HeaderWrap>
	);
}
