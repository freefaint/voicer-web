import { GridColDef } from "@material-ui/data-grid";

export const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    flex: 1,
  },
  {
    field: 'name',
    headerName: 'Имя',
    flex: 2,
  },
  {
    field: 'cost',
    headerName: 'Имя',
    flex: 1,
  },
  {
    field: 'weight',
    headerName: 'Имя',
    flex: 1,
  },
  {
    field: 'category',
    headerName: 'Имя',
    flex: 2,
  },
  {
    field: 'age',
    headerName: 'Имя',
    flex: 1,
  },
  {
    field: 'description',
    headerName: 'Имя',
    flex: 4,
  },
];

export default columns;