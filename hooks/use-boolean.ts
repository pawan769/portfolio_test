import { useCallback, useState } from 'react';

/**
 * A hook for managing boolean state with a simple toggle function.
 * @param initialValue The initial boolean value or a function that returns a boolean
 * @returns A tuple containing the boolean value and a toggle function
 */
export default function useBoolean(
  initialValue: boolean | (() => boolean),
): [boolean, (a?: unknown) => void] {
  const [flag, setFlag] = useState<boolean>(initialValue);
  const toggleFlag = useCallback((inputValue?: unknown) => {
    setFlag(prevFlag =>
      typeof inputValue === 'boolean' ? inputValue : !prevFlag,
    );
  }, []);

  return [flag, toggleFlag];
}
