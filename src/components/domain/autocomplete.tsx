import { makeStyles, TextFieldProps } from '@material-ui/core';
import MuiAutocomplete, { AutocompleteProps } from '@material-ui/lab/Autocomplete';

import { TextField } from "components/material";

const useStyles = makeStyles({
  option: {
    padding: "1rem"
  },

  input: {
    padding: "5.5px 4px !important"
  },

  root: {
    '& .MuiChip-root': {
      backgroundColor: "#fff",
      border: "1px solid #ccc",
      margin: "0.0625rem",
      height: "1.75rem"
    },
  }
})

const useReadonlyStyles = makeStyles({
  option: {
    padding: "1rem"
  },

  input: {
    padding: "5.5px 4px !important"
  },

  root: {
    '& .MuiChip-root': {
      backgroundColor: "#fff",
      border: "1px solid #ccc",
      margin: "0.0625rem",
      height: "1.75rem"
    },

    '& .MuiChip-root.Mui-disabled svg': {
      display: "none"
    },

    '& .MuiChip-root.Mui-disabled': {
      opacity: 1
    }
  }
})

export function Autocomplete<
  T,
  T1 extends boolean | undefined,
  T2 extends boolean | undefined,
  T3 extends boolean | undefined
>(props: Omit<AutocompleteProps<T, T1, T2, T3>, 'renderInput'> & Pick<TextFieldProps, 'label' | 'error' | 'helperText' | 'required'> & { readOnly?: boolean }) {
  const classes = useStyles();
  const readonlyClasses = useReadonlyStyles();

  return (
    <MuiAutocomplete
      {...props}
      classes={props.readOnly ? readonlyClasses : classes}
      disabled={props.disabled || props.readOnly}
      renderInput={inputProps => (
        <TextField
          {...inputProps}
          
          readOnly={props.readOnly}
          label={props.label}
          error={props.error}
          helperText={props.helperText ?? ' '}
          required={props.required}
        />
      )}
    />
  );
}