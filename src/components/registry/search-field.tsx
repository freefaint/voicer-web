import { useCallback } from "react";
import { delay, usePropsState } from "avrora";

import { TextField } from "components/domain";


interface SearchFieldProps {
  value: string;
  onChange: (string: string) => void;
}

export function SearchField(props: SearchFieldProps) {
  const { value, set } = usePropsState(props.value);

  const setValue = useCallback((string: string) => {
    set(string);

    delay(props.onChange, 1000, [string])
  }, [props.onChange, set])

  return (
    <TextField
      value={value}
      onChange={e => setValue(e.currentTarget.value)}
      label="Поиск..."
      size="small"
    />
  );
}
