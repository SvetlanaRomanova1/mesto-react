import { useEffect, useState } from 'react';

export function useIsEditFiled() {
  const [isTypeField, setIsTypeField] = useState(false);
  useEffect(() => {
    return () => {
      setIsTypeField(false)
    }
  }, [])

  return [isTypeField, setIsTypeField];
}