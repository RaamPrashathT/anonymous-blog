import { useEffect, useState } from "react";

export const useDebounce = <Type>(value: Type, delay = 1000) => {
    const [debouncedValue, setDebouncedValue] = useState<Type>(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timeout);
    }, [value, delay]);

    return debouncedValue;
}