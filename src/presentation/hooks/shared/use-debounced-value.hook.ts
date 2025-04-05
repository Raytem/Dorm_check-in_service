import { useState, useEffect, useCallback } from 'react';
import { useDebounce } from 'use-debounce';

export function useDebouncedValue<T>(
	initialValue: T,
	debounceDelay: number = 500,
	onChange: (value: T) => void
) {
	const [localValue, setLocalValue] = useState<T>(initialValue);
	const [debouncedValue] = useDebounce(localValue, debounceDelay);

	const debouncedOnFilterChange = useCallback(() => {
		onChange(debouncedValue);
	}, [debouncedValue, onChange]);

	useEffect(() => {
		debouncedOnFilterChange();
	}, [debouncedValue]);

	return [localValue, setLocalValue] as const;
}