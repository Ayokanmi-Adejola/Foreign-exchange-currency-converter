"use client";

import { useMemo } from "react";
import {
	Area,
	AreaChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { useAppContext } from "@/hooks/Context/AppContext";
import useRateHistory from "@/hooks/useRateHistory";
import type { IChartRange } from "@/types";
import {
	ChartCard,
	ChartHeader,
	ChartMeta,
	ErrorState,
	LoadingState,
	PairLabel,
	RangeBtn,
	RangeRow,
	StatCard,
	StatLabel,
	StatsRow,
	StatValue,
	Wrap,
} from "./styled";

const RANGES: IChartRange[] = ["1d", "1w", "1m", "3m", "1y", "5y"];

function formatDate(dateStr: string, range: IChartRange): string {
	const d = new Date(dateStr);
	if (range === "1d" || range === "1w") {
		return d.toLocaleDateString("en-GB", {
			day: "numeric",
			month: "short",
		});
	}
	if (range === "1m" || range === "3m") {
		return d.toLocaleDateString("en-GB", {
			day: "numeric",
			month: "short",
		});
	}
	return d.toLocaleDateString("en-GB", { month: "short", year: "2-digit" });
}

function CustomTooltip({ active, payload, label }: any) {
	if (!active || !payload?.length) return null;
	return (
		<div
			style={{
				background: "var(--surface)",
				border: "1px solid var(--border)",
				borderRadius: "6px",
				padding: "8px 12px",
				fontSize: "12px",
				color: "var(--text-primary)",
			}}
		>
			<div style={{ color: "var(--text-muted)", marginBottom: 4 }}>
				{label}
			</div>
			<div style={{ fontWeight: 700 }}>{payload[0].value.toFixed(4)}</div>
		</div>
	);
}

export default function HistoryTab() {
	const { baseCurrency, targetCurrency, chartRange, setChartRange } =
		useAppContext();
	const { data, error, isLoading } = useRateHistory(
		baseCurrency,
		targetCurrency,
		chartRange,
	);

	const chartData = useMemo(
		() =>
			data?.points.map((p) => ({
				date: formatDate(p.date, chartRange),
				rate: p.rate,
			})) ?? [],
		[data, chartRange],
	);

	const yDomain = useMemo<[number, number]>(() => {
		if (!data?.points.length) return [0, 1];
		const rates = data.points.map((p) => p.rate);
		const min = Math.min(...rates);
		const max = Math.max(...rates);
		const pad = (max - min) * 0.1 || 0.001;
		return [min - pad, max + pad];
	}, [data]);

	const lastTimestamp = useMemo(() => {
		if (!data?.points.length) return "";
		const last = data.points[data.points.length - 1];
		const d = new Date(last.date);
		return d.toLocaleDateString("en-GB", {
			day: "numeric",
			month: "short",
		});
	}, [data]);

	return (
		<Wrap>
			<StatsRow role="list" aria-label="Rate statistics">
				<StatCard role="listitem">
					<StatLabel>Open</StatLabel>
					<StatValue>{data ? data.open.toFixed(4) : "—"}</StatValue>
				</StatCard>
				<StatCard role="listitem">
					<StatLabel>Last</StatLabel>
					<StatValue>{data ? data.last.toFixed(4) : "—"}</StatValue>
				</StatCard>
				<StatCard role="listitem">
					<StatLabel>Change</StatLabel>
					<StatValue
						$color={
							data && data.change >= 0
								? "var(--positive)"
								: "var(--negative)"
						}
					>
						{data
							? `${data.change >= 0 ? "+" : ""}${data.change.toFixed(4)}`
							: "—"}
					</StatValue>
				</StatCard>
				<StatCard role="listitem">
					<StatLabel>% Change</StatLabel>
					<StatValue
						$color={
							data && data.changePercent >= 0
								? "var(--positive)"
								: "var(--negative)"
						}
					>
						{data ? (
							<>
								{data.changePercent >= 0 ? "▲" : "▼"}{" "}
								{data.changePercent >= 0 ? "+" : ""}
								{data.changePercent.toFixed(2)}%
							</>
						) : (
							"—"
						)}
					</StatValue>
				</StatCard>
			</StatsRow>

			<RangeRow role="group" aria-label="Chart time range">
				{RANGES.map((r) => (
					<RangeBtn
						key={r}
						$active={chartRange === r}
						onClick={() => setChartRange(r)}
						aria-pressed={chartRange === r}
					>
						{r}
					</RangeBtn>
				))}
			</RangeRow>

			<ChartCard>
				<ChartHeader>
					<PairLabel>
						{baseCurrency}/{targetCurrency}
					</PairLabel>
					{data && (
						<ChartMeta>
							{data.last.toFixed(4)} · {lastTimestamp}
						</ChartMeta>
					)}
				</ChartHeader>

				{isLoading && <LoadingState>Loading chart data…</LoadingState>}

				{!isLoading && (error || !data || chartData.length === 0) && (
					<ErrorState>
						<h3>No chart data available</h3>
						<p>
							We couldn&apos;t load rate history for{" "}
							{baseCurrency}/{targetCurrency} right now. This
							usually clears up in a minute.
						</p>
					</ErrorState>
				)}

				{!isLoading && data && chartData.length > 0 && (
					<ResponsiveContainer width="100%" height={200}>
						<AreaChart
							data={chartData}
							margin={{ top: 4, right: 0, bottom: 0, left: 0 }}
						>
							<defs>
								<linearGradient
									id="rateGrad"
									x1="0"
									y1="0"
									x2="0"
									y2="1"
								>
									<stop
										offset="5%"
										stopColor="#c9f000"
										stopOpacity={0.25}
									/>
									<stop
										offset="95%"
										stopColor="#c9f000"
										stopOpacity={0}
									/>
								</linearGradient>
							</defs>
							<XAxis
								dataKey="date"
								tick={{
									fill: "var(--text-muted)",
									fontSize: 10,
									fontFamily: "inherit",
								}}
								axisLine={{ stroke: "var(--border-light)" }}
								tickLine={false}
								interval="preserveStartEnd"
							/>
							<YAxis
								domain={yDomain}
								tick={{
									fill: "var(--text-muted)",
									fontSize: 10,
									fontFamily: "inherit",
								}}
								axisLine={false}
								tickLine={false}
								tickFormatter={(v) => v.toFixed(4)}
								width={55}
							/>
							<Tooltip content={<CustomTooltip />} />
							<Area
								type="monotone"
								dataKey="rate"
								stroke="#c9f000"
								strokeWidth={2}
								fill="url(#rateGrad)"
								dot={false}
								activeDot={{
									r: 4,
									fill: "#c9f000",
									strokeWidth: 0,
								}}
							/>
						</AreaChart>
					</ResponsiveContainer>
				)}
			</ChartCard>
		</Wrap>
	);
}
