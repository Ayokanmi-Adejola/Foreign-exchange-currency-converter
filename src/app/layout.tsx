import type { Metadata } from "next";
import { AppProvider } from "@/hooks/Context/AppContext";
import StyledComponentsRegistry from "@/lib/registry";
import GlobalStyle from "@/styles/global";
import "./globals.css";

export const metadata: Metadata = {
	title: "Foreign Exchange Currency Converter — Live Exchange Rates",
	description:
		"Check live foreign exchange rates, view rate history charts, compare currencies, and log your conversions.",
	icons: { icon: "/assets/images/favicon-32x32.png" },
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body>
				<StyledComponentsRegistry>
					<GlobalStyle />
					<AppProvider>{children}</AppProvider>
				</StyledComponentsRegistry>
			</body>
		</html>
	);
}
