import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';

export function useDebouncedFilter<T>(
	initialValue: T,
	debounceDelay: number = 500,
	onFilterChange: (value: T) => void
) {
	const [localValue, setLocalValue] = useState<T>(initialValue);
	const [debouncedValue] = useDebounce(localValue, debounceDelay);

	useEffect(() => {
		onFilterChange(debouncedValue);
	}, [debouncedValue]);

	return [localValue, setLocalValue] as const;
}