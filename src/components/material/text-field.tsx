import { makeStyles } from '@material-ui/core';
import MuiTextField, { TextFieldProps } from '@material-ui/core/TextField';

const useInputStyles = makeStyles({
  input: {
    "&:disabled": {
      color: "rgba(0, 0, 0, 1)" // (default alpha is 0.38)
    }
  },
});

export const TextField = (props: TextFieldProps & { readOnly?: boolean }) => {
  const inputClasses = useInputStyles();

  return (
    <MuiTextField
      {...props}

      disabled={props.disabled || props.readOnly}

      InputProps={{
        ...props.InputProps,
        
        endAdornment: props.disabled ? undefined : props.InputProps?.endAdornment,

        classes: props.readOnly ? inputClasses : props.InputProps?.classes
      }} />
  );
};