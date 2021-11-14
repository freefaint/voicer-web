import { Fragment } from 'react';
import { Divider, SvgIcon, Button } from '@material-ui/core';

import { Operation } from 'types/registry/operation';
import { Texts } from 'types/registry/texts';

import { OperationControl } from '../operation-control';
import { Removable, RemoveControl } from '../remove-control';
import { EditOutlined } from '@material-ui/icons';

interface ControlProps<T> extends Removable<T> {
  item: T;
  changing: boolean;
  changed: boolean;
  operations?: Operation<T>[];
  loading?: boolean;
  info?: React.ReactNode;
  texts: Texts<T>;
  removeService?: (id: string | number) => Promise<void>;
  onChange: () => void;
  onSave: () => void;
  onCancel: () => void;
  onOperation: () => void;
}

export function Controls<T extends { id: string | number }>({
  item,
  changing,
  changed,
  loading,
  operations,
  info,
  texts,
  removeService,
  onChange,
  onSave,
  onCancel,
  onOperation
}: ControlProps<T>) {
  if (changing) {
    return (
      <div style={{ display: "flex", alignItems: "center", margin: "0.18725rem 0" }}>
        <div style={{ margin: "0 1rem 0 0"}}>
          <Button size="large" variant="contained" color="primary" disabled={!changed || loading} onClick={onSave}>Сохранить</Button>
        </div>
        
        <div style={{ margin: "0 1rem 0 0"}}>
          <Button size="large" variant="text" color="primary" onClick={onCancel}>Отменить</Button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ margin: "0 1rem 0 0"}}>
        <Button
          size="large"
          variant="contained"
          color="primary"
          startIcon={<SvgIcon component={EditOutlined} />}
          onClick={onChange}
        >
          Редактировать
        </Button>
      </div>
      
      {operations?.map((operation, j) => (
        <Fragment key={operation.label}>
          {operation.group && operation.group.map(operation => (
            <OperationControl
              key={operation.label}
              data={item}
              type="button"
              operation={operation}
              disabled={loading}
              onOperation={onOperation}
            />
          ))}

          {!operation.group && (
            <OperationControl
              key={operation.label}
              data={item}
              type="button"
              disabled={loading}
              noDivider={j < operations.length - 1}
              operation={operation}
              onOperation={onOperation}
            />
          )}
        </Fragment>
      ))}
      
      {removeService && (
        <RemoveControl
          data={item}
          texts={texts}
          disabled={loading}
          service={removeService}
          onOperation={onOperation}
        />
      )}

      {!!info && (
        <>
          <div style={{ height: "1.5rem" }}>
            <Divider orientation="vertical" variant="middle" />
          </div>

          {info}
        </>
      )}
    </div>
  );
}
