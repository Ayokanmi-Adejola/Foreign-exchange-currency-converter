"use client";

import { formatDistanceToNow } from "date-fns";
import { useAppContext } from "@/hooks/Context/AppContext";
import {
	Amount,
	Amounts,
	ArrowIcon,
	ClearBtn,
	DeleteBtn,
	DeleteIcon,
	EmptyState,
	LogCount,
	LogHeader,
	LogList,
	LogRow,
	LogTitle,
	PairInfo,
	PairLabel,
	TimeStamp,
	Wrap,
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

function relativeTime(ts: number): string {
	try {
		return formatDistanceToNow(new Date(ts), { addSuffix: false });
	} catch {
		return "—";
	}
}

export default function LogTab() {
	const { log, deleteLogEntry, clearLog } = useAppContext();

	if (!log.length) {
		return (
			<EmptyState>
				<h3>No conversions logged yet</h3>
				<p>
					Every conversion is recorded here automatically when you tap
					Log conversion. Your log is private to this session and this
					browser.
				</p>
			</EmptyState>
		);
	}

	return (
		<Wrap>
			<LogHeader>
				<div>
					<LogTitle>Conversion log</LogTitle>
					<LogCount>{log.length} logged</LogCount>
				</div>
				<ClearBtn
					onClick={clearLog}
					aria-label="Clear all conversion log entries"
				>
					Clear all
				</ClearBtn>
			</LogHeader>
			<LogList role="list" aria-label="Conversion log">
				{log.map((entry) => (
					<LogRow key={entry.id} role="listitem">
						<TimeStamp
							title={new Date(entry.timestamp).toLocaleString()}
						>
							{relativeTime(entry.timestamp)}
						</TimeStamp>
						<PairInfo>
							<PairLabel>
								{entry.base}
								<ArrowIcon
									src="/assets/images/icon-arrow-right.svg"
									alt="to"
								/>
								{entry.target}
							</PairLabel>
							<Amounts>
								<Amount>
									{formatAmount(entry.amount)} {entry.base}
								</Amount>
								{" → "}
								<Amount>
									{formatAmount(entry.result)} {entry.target}
								</Amount>
							</Amounts>
						</PairInfo>
						<DeleteBtn
							onClick={() => deleteLogEntry(entry.id)}
							aria-label={`Delete log entry: ${entry.amount} ${entry.base} to ${entry.target}`}
						>
							<DeleteIcon
								src="/assets/images/icon-delete.svg"
								alt=""
							/>
						</DeleteBtn>
					</LogRow>
				))}
			</LogList>
		</Wrap>
	);
}
