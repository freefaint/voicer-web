import { IconButton, Snackbar } from "@material-ui/core"
import CloseIcon from '@material-ui/icons/Close';

interface ErrorProps {
  text?: string;
  onClose: () => void;
}

export const Error = ({ text, onClose }: ErrorProps) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={!!text}
      autoHideDuration={6000}
      onClose={onClose}
      message={text}
      action={
        <IconButton size="small" aria-label="close" color="inherit" onClick={onClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  )
}