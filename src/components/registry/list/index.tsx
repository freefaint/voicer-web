import { useState, useMemo, useEffect } from 'react';

import { DataGridProps, GridRowId } from '@material-ui/data-grid';
import { Paper, Typography, Divider, AppBar, Toolbar } from '@material-ui/core';

import { Controls } from './controls';

import { DataGrid, Pagination } from 'components/material';

import { Operation } from 'types/registry/operation';
import { Texts } from 'types/registry/texts';

import { Removable } from '../remove-control';

interface ListProps<T> extends Pick<DataGridProps, 'columns' | 'sortingMode' | 'sortModel' | 'onSortModelChange'>, Removable<T> {
  items: T[];
  operations: Operation<T>[];
  page: number;
  pages: number;
  searchString: string;
  loading?: boolean;
  texts: Texts<T>;
  removeService: (id: string | number) => Promise<void>;
  onOpenCreation: () => void;
  onOpenItem: (id: string) => void;
  onOperation: () => void;
  onChangePage: (page: number) => void;
  onChangeSearchString: (string: string) => void;
}

export function List<T extends { id: number | string }>({
  items,
  columns,
  operations,
  loading,
  page,
  pages,
  texts,
  removeService,
  searchString,
  sortModel,
  sortingMode,
  onSortModelChange,
  onOpenCreation,
  onOpenItem,
  onOperation,
  onChangePage,
  onChangeSearchString
}: ListProps<T>) {
  const [selectionModel, setSelectionModel] = useState<GridRowId[]>([]);

  // TODO Разобраться с типами
  const selectedItems = useMemo(() => items.filter((item: any) => selectionModel.includes(item.id)), [items, selectionModel]);

  useEffect(() => {
    if (selectionModel.find(id => !items.find(item => item.id === id))) {
      setSelectionModel(selectionModel.filter(id => items.find(item => item.id === id)));
    }
  }, [selectionModel, items]);

  return (
    <>
      <main style={{ padding: "1rem", height: `calc(100vh - 10rem)` }}>
        <Paper elevation={3} style={{ display: "flex", height: "100%", flexDirection: "column" }}>
          <div style={{ padding: "1.25rem 1.5rem" }}>
            <Typography variant="h5">{texts.registryTitle}</Typography>
          </div>

          <Divider />

          <div style={{ padding: "0.75rem 1.5rem"}}>
            <Controls
              items={selectedItems}
              operations={operations}
              texts={texts}
              loading={loading}
              removeService={removeService}
              searchString={searchString}
              onOperation={onOperation}
              onChangeSearchString={onChangeSearchString}
              onOpenCreation={onOpenCreation}
            />
          </div>

          <DataGrid
            // autoHeight

            loading={loading}
            rows={items}
            columns={columns}
            
            selectionModel={selectionModel}
            sortingMode={sortingMode}
            sortModel={sortModel}

            disableColumnMenu
            hideFooterPagination
            checkboxSelection
            disableSelectionOnClick

            onRowClick={item => onOpenItem(item.row._id)}
            onSelectionModelChange={setSelectionModel}
            onSortModelChange={onSortModelChange}
          />
        </Paper>
      </main>
      
      <footer>
        <AppBar position="fixed" style={{ backgroundColor: "#fff", top: "auto", bottom: 0 }}>
          <Toolbar style={{ justifyContent: "center" }}>
            <Pagination page={page} color="primary" count={pages} onChange={(e, number) => onChangePage(number)} />
          </Toolbar>
        </AppBar>
      </footer>
    </>
  );
}
