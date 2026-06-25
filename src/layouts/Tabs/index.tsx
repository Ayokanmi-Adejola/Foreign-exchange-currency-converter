"use client";

import { useAppContext } from "@/hooks/Context/AppContext";
import CompareTab from "@/layouts/Compare";
import FavoritesTab from "@/layouts/Favorites";
import HistoryTab from "@/layouts/History";
import LogTab from "@/layouts/Log";
import type { IActiveTab } from "@/types";
import { Badge, Panel, Section, TabBtn, TabNav } from "./styled";

const TABS: { id: IActiveTab; label: string }[] = [
	{ id: "history", label: "History" },
	{ id: "compare", label: "Compare" },
	{ id: "favorites", label: "Favorites" },
	{ id: "log", label: "Log" },
];

export default function Tabs() {
	const { activeTab, setActiveTab, favorites, log } = useAppContext();

	const badgeMap: Partial<Record<IActiveTab, number>> = {
		favorites: favorites.length,
		log: log.length,
	};

	return (
		<Section>
			<TabNav role="tablist" aria-label="Data panels">
				{TABS.map(({ id, label }) => (
					<TabBtn
						key={id}
						role="tab"
						aria-selected={activeTab === id}
						aria-controls={`panel-${id}`}
						id={`tab-${id}`}
						$active={activeTab === id}
						onClick={() => setActiveTab(id)}
					>
						{label}
						{badgeMap[id] ? (
							<Badge aria-label={`${badgeMap[id]} items`}>
								{badgeMap[id]}
							</Badge>
						) : null}
					</TabBtn>
				))}
			</TabNav>

			<Panel
				role="tabpanel"
				id={`panel-${activeTab}`}
				aria-labelledby={`tab-${activeTab}`}
			>
				{activeTab === "history" && <HistoryTab />}
				{activeTab === "compare" && <CompareTab />}
				{activeTab === "favorites" && <FavoritesTab />}
				{activeTab === "log" && <LogTab />}
			</Panel>
		</Section>
	);
}
