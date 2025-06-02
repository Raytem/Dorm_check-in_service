import { useState, useCallback, useEffect } from 'react';

export const useBodyOverflow = () => {
  const [isHidden, setIsHidden] = useState(
    () => document.body.style.overflow === 'hidden',
  );

  const toggleOverflow = useCallback((hidden: boolean) => {
    document.body.style.overflow = hidden ? 'hidden' : '';
    setIsHidden(hidden);
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return { isOverflowHidden: isHidden, toggleOverflow };
};
