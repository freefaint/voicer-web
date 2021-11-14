import { useState, useCallback, Fragment } from 'react';

import { IconButton, Divider, Menu, Button, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { Operation } from 'types/registry/operation';
import { Texts } from 'types/registry/texts';

import { OperationControl } from '../operation-control';
import { Removable, RemoveControl } from '../remove-control';
import { SearchField } from '../search-field';

interface ControlProps<T> extends Removable<T> {
  items: T[]
  searchString: string;
  operations: Operation<T>[];
  loading?: boolean;
  texts: Texts<T>;
  removeService: (id: string | number) => Promise<void>;
  onOpenCreation: () => void;
  onOperation: () => void;
  onChangeSearchString: (string: string) => void;
}

export function Controls<T extends { id: string | number }>(props: ControlProps<T>) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Operations {...props} />

      <SearchField
        value={props.searchString}
        onChange={value => props.onChangeSearchString(value)}
      />
    </div>
  );
}

function Operations<T extends { id: string | number }>({ items, operations, texts, loading, removeService, onOpenCreation, onOperation }: ControlProps<T>) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const handleOperation = useCallback(() => {
    onOperation();
    handleClose();
  }, [handleClose, onOperation]);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ margin: "0 1rem 0 0"}}>
        <Button size="large" variant="contained" color="primary" startIcon={<AddIcon />} onClick={onOpenCreation}>Добавить</Button>
      </div>
      
      {operations.map(operation => operation.group ? (
        <Fragment key={operation.label}>
          <Tooltip title={operation.title?.(items)}>
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                disabled={!items.length || loading}
                onClick={handleMenu}
              >
                {operation.icon(!items.length)}
              </IconButton>
            </div>
          </Tooltip>
    
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={open}
            onClose={handleClose}
          >
            {operation.group?.map(operation => (
              <OperationControl
                key={operation.label}
                type="menu"
                disabled={loading}
                data={items}
                operation={operation}
                onOperation={handleOperation}
              />
            ))}
          </Menu>
        </Fragment>
      ) : (
        <OperationControl
          noDivider
          key={operation.label}
          type="button"
          disabled={loading}
          data={items}
          operation={operation}
          onOperation={handleOperation}
        />
      ))}

      <div style={{ height: "1.5rem" }}>
        <Divider orientation="vertical" variant="middle" />
      </div>
      
      <RemoveControl
        data={items}
        texts={texts}
        disabled={loading}
        service={removeService}
        onOperation={onOperation}
      />
    </div>
  );
}
