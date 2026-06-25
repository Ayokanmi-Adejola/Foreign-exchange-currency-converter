"use client";

import { useEffect, useState } from "react";

export default function useLocalStorage<T>(key: string, initialValue: T) {
	const [value, setValue] = useState<T>(initialValue);
	const [hydrated, setHydrated] = useState(false);

	useEffect(() => {
		try {
			const stored = localStorage.getItem(key);
			if (stored !== null) setValue(JSON.parse(stored));
		} catch {}
		setHydrated(true);
	}, [key]);

	const set = (newValue: T | ((prev: T) => T)) => {
		setValue((prev) => {
			const next =
				typeof newValue === "function"
					? (newValue as (prev: T) => T)(prev)
					: newValue;
			try {
				localStorage.setItem(key, JSON.stringify(next));
			} catch {}
			return next;
		});
	};

	return [value, set, hydrated] as const;
}
