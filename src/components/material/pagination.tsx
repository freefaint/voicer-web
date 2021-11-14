import MuiPagination from '@material-ui/lab/Pagination';
import { withStyles } from '@material-ui/styles';

export const Pagination = withStyles({
  ul: {
    '& .MuiPaginationItem-root.Mui-selected': {
      color: "#019393",
      borderRadius: 0,
      borderBottom: "0.125rem solid #019393",
      backgroundColor: "transparent !important",
      marginBottom: "-0.125rem"
    }
  }
})(MuiPagination);