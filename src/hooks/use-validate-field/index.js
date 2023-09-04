import { useEffect, useState } from 'react';

export function useValidateField(ref) {
  const [message, setMessage] = useState('');
  const validationMessage = ref.current?.validationMessage;

  useEffect(() => {
    setMessage(validationMessage);
  }, [validationMessage]);

  return message;
}