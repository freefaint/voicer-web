import { useCallback, useMemo, useEffect, useState, ReactNode } from 'react';
import { useHistory, useRouteMatch, useLocation } from 'react-router-dom';

import { GridSortModel } from '@material-ui/data-grid';
import { CircularProgress } from '@material-ui/core';

import { useSource } from 'avrora';

import { RegistrySchema } from 'types/registry/schema';

import { Item } from './item';
import { List } from './list';

interface RegistryProps<T> {
  schema: RegistrySchema<T>;
  icon: ReactNode;
  route: string;
  root?: boolean;
  onChange?: () => void;
}

export function Registry<T extends { id: number | string }>({ schema, icon, route, root, onChange }: RegistryProps<T>) {
  const { operations, columns, service, texts, card } = schema;

  const history = useHistory();
  const location = useLocation();
  const match = useRouteMatch<{ id?: string; tab: string; }>(`/${route}/:id?/:tab?`);

  const { id, tab } = useMemo(() => match?.params ?? { id: undefined, tab: undefined}, [ match ]);

  const page = useMemo(() => parseInt(new URLSearchParams(location.search).get('page') ?? '1', 10), [location.search]);

  const [searchString, setSearchString] = useState('');
  const [removing, setRemoving] = useState(false);
  const [saving, setSaving] = useState(false);
  const [sortModel, setSortModel] = useState<GridSortModel>();
  
  const { data, fetch: reloadItems, loading: itemsLoading } = useSource(() => service.getItems({
    pageIndex: page,
    pageSize: 10,
    sortingField: sortModel?.[0]?.field as keyof T,
    sortingOrder: sortModel?.[0] ? sortModel[0].sort === 'asc' ? 1 : 2 : 0,
    name: searchString
  }), [service, page, sortModel, searchString]);

  const { data: item, fetch: reloadItem, loading: itemLoading } = useSource(() => id
    ? (id ==='create' ? Promise.resolve(schema.blank) : service.getItem(id))
    : Promise.resolve(undefined)
  , [ id ]);

  const pages = useMemo(() => data && Math.ceil(data.totalCount / 10), [data]);

  const setPage = useCallback((i: number) => history.push(i === 1 ? location.pathname : `?page=${i}`), [history, location.pathname]);
  const openItem = useCallback((id: string) => history.push(`/${route}/${id}`), [history, route]);
  const openTab = useCallback((tab?: string) => history.push(`/${route}/${id}${tab ? `/${tab}` : ''}`), [history, id, route]);

  const closeItem = useCallback(() => {
    history.push(root ? '/' : `/${route}`);
    reloadItems();
  }, [history, reloadItems, root, route]);

  const handleOperation = useCallback(() => {
    if (item) {
      reloadItem();
    }

    reloadItems();
  }, [item, reloadItem, reloadItems]);

  const handleSortModelChange = (model: GridSortModel) => {
    if (model !== sortModel) {
      setSortModel(model);
    }
  };

  const handleSave = useCallback((item: T) => {
    setSaving(true);

    return service.saveItem(item).then(item => {
      reloadItems();
      
      if (id === 'create') {
        closeItem();
      }

      if (id !== 'create') {
        reloadItem();
      }

      onChange?.();

      return item;
    }).finally(() => {
      setSaving(false)
    });
  }, [service, reloadItems, id, onChange, closeItem, reloadItem]);

  const handleRemove = useCallback((id: string | number) => {
    setRemoving(true);

    return service.removeItem(id).then(() => {
      if (item) {
        closeItem();
      }
    }).finally(() => {
      setRemoving(false);
    });
  }, [service, item, closeItem]);

  useEffect(() => {
    setPage(1)
  }, [searchString, setPage]);

  useEffect(() => {
    if (data && !data.entities.length && data.totalCount && page > 1) {
      setPage(page - 1);
    }
  }, [data, page, setPage])

  if (id) {
    if (!item) {
      return (
        <div style={{ display: "flex", height: "calc(100vh - 4rem)", justifyContent: "center", alignItems: "center"}}>
          <CircularProgress />
        </div>
      );
    }

    return (
      <Item
        item={item as unknown as T}
        icon={icon}
        tab={tab}
        card={card}
        creating={id === 'create'}
        loading={itemLoading || saving || removing}
        texts={texts}
        errors={schema.errors}
        operations={operations}
        removable={schema.removable}
        getTitle={schema.getTitle}
        removeService={handleRemove}
        onClose={closeItem}
        onSave={handleSave}
        onOpenTab={openTab}
        onOperation={handleOperation}
      />
    );
  }

  if (!columns || !data) {
    return (
      <div style={{ display: "flex", height: "calc(100vh - 4rem)", justifyContent: "center", alignItems: "center"}}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <List
      items={data.entities as unknown as T[]}
      operations={operations}
      columns={columns}
      page={Math.max(page)}
      loading={itemsLoading || removing}
      texts={texts}
      pages={pages!}
      searchString={searchString}
      sortingMode="server"
      sortModel={sortModel}
      removable={schema.removable}
      getTitle={schema.getTitle}
      removeService={handleRemove}
      onSortModelChange={handleSortModelChange}
      onOpenCreation={() => openItem('create')}
      onOpenItem={openItem}
      onOperation={handleOperation}
      onChangePage={setPage}
      onChangeSearchString={setSearchString}
    />
  );
}
