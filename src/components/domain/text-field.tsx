import { useState } from 'react';
import { TextFieldProps, IconButton, InputAdornment } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOffOutlined';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';

import { TextField as CustomMaterialTextField } from '../material';

export const TextField = (props: TextFieldProps & { readOnly?: boolean }) => {
  const [passwordIsHidden, setPasswordIsHidden] = useState(true);

  return (
    <CustomMaterialTextField
      {...props}

      variant="outlined"
      type={props.type === "password" ? passwordIsHidden ? "password" : "text" : props.type}
      helperText={props.helperText ?? ' '}
      
      InputProps={!props.readOnly && !props.multiline ? {
        endAdornment: props.type === "password" ? (
          <InputAdornment position="end">
            <IconButton tabIndex="-1" disabled={props.disabled} onClick={() => setPasswordIsHidden(bool => !bool)}>
              {passwordIsHidden ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        ) : props.type === "search" ? (
          <InputAdornment position="end">
            <IconButton tabIndex="-1" disabled={props.disabled} onClick={() => void 0}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ) : props.type !== "datetime-local" ? (
          <InputAdornment position="end">
            <IconButton
              tabIndex="-1"
              disabled={props.disabled}
              onClick={() => props.onChange?.({ currentTarget: { name: props.name, value: '' } } as any)}
            >
              <CloseIcon />
            </IconButton>
          </InputAdornment>
        ) : undefined
      } : undefined}
    />
  );
}