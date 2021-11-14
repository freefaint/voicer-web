import { DataGrid as MuiDataGrid, ruRU, DataGridProps } from '@material-ui/data-grid';
import { withStyles } from '@material-ui/core';

const StyledDataGrid = withStyles({
  root: {
    margin: "-1px",

    "& .MuiDataGrid-columnHeaderCheckbox": {
      margin: "0 0 0 0.5rem"
    },
    "& .MuiDataGrid-cell:focus": {
      outline: 0,
    },
    "& .MuiDataGrid-cellCheckbox": {
      padding: "0 1.5rem 0 2rem",
      outline: "0 !important",
    },
    "& .MuiDataGrid-columnSeparator": {
      display: "none"
    },
    "& .MuiDataGrid-columnHeader": {
      padding: "0 0.5rem",
      outline: "0 !important",
    },
    "& .MuiDataGrid-columnHeader:focus": {
      outline: 0,
    },
    "& .MuiDataGrid-columnHeaderTitle": {
      padding: "0 0.5rem 0 0"
    },
    "& .MuiDataGrid-columnHeaderTitleContainer": {
      padding: "0"
    },
    "& .MuiDataGrid-footerContainer": {
      display: "none"
    }
  },
  row: {
    cursor: "pointer"
  }
})(MuiDataGrid);

export const DataGrid = (props: DataGridProps) => (
  <StyledDataGrid
    // @ts-ignore
    localeText={ruRU.props.MuiDataGrid.localeText}
    
    {...props}
  />
);
