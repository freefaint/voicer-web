import { useMemo, useCallback, useContext, useState } from 'react';

import { IconButton, MenuItem, Divider, Tooltip } from '@material-ui/core';

import { Operation } from "types/registry/operation";

import { notificationContext } from 'contexts/notification/notification.context';

import { Error } from 'components/domain';

type OperationRenderType = 'menu' | 'button';

interface OperationControlProps<T> {
  data: T[] | T;
  noDivider?: boolean;
  type: OperationRenderType;
  operation: Operation<T>;
  disabled?: boolean;
  onOperation: () => void;
}

export function OperationControl<T>({ data, disabled: locked, type, noDivider, operation, onOperation }: OperationControlProps<T>) {
  const notification = useContext(notificationContext);
  const [error, setError] = useState<string>();
  
  const items = useMemo(() => data instanceof Array ? data : [data], [data]);
  const isGroupOperation = useMemo(() => data instanceof Array, [data]);
  const several = useMemo(() => items.length > 1, [items]);

  const handleSubmit = useCallback((data?: Record<string, any>) => {
    const filtered = operation.skip ? items.filter(i => !items.filter(operation.skip!.condition).includes(i)) : items;

    return Promise.all(filtered.map(i => operation.service?.(i, data)))
      .then(() => {
        onOperation();
        
        if (operation.notification) {
          notification?.push({
            alert: true,
            title: operation.notification.title(filtered),
            text: operation.notification.text(filtered),
          });
        }

        return Promise.resolve(void 0);
      })
      .catch(e => {
        if (operation.confirm?.form) {
          setError(e.response.data.title);
        } else {
          notification?.push({
            alert: true,
            title: "Ошибка",
            text: e.response.data.title,
          });
        }
        // onOperation();
        return Promise.reject(e);
      });
  }, [items, operation, onOperation, notification]);

  const handleConfirm = useCallback((data?: Record<string, any>): Promise<void> => {
    if (operation.blockers) {
      const blocker = operation.blockers.find(condition => condition.block(items));

      if (blocker) {
        notification?.push({
          ...blocker.error,
  
          text: several ? blocker.error.severalText?.(items) || blocker.error.text?.(items) : blocker.error.text?.(items),
          title: several ? blocker.error.severalTitle?.(items) || blocker.error.title(items) : blocker.error.title(items),
        });

        return Promise.reject();
      }
    }

    if (operation.skip) {
      const filtered = items.filter(i => !items.filter(operation.skip!.condition).includes(i));
      
      if (filtered.length && (filtered.length < items.length)) {
        notification?.push({
          text: operation.skip!.dialog.text?.(filtered) ?? "Операция будет выполнена не для всех элементов",
          title: operation.skip!.dialog.title?.(filtered) ?? "Групповая операция",

          onConfirm: handleSubmit,
        });

        return Promise.reject();
      }
      
      if (!filtered.length) {
        notification?.push({
          text: "Невозможно выполнить операцию для элементов",
          title: "Ошибка",

          alert: true,
        });

        return Promise.reject();
      }
    }
  
    return handleSubmit(data);
  }, [operation.blockers, operation.skip, handleSubmit, items, notification, several]);

  const handleOperation = useCallback(() => {
    if (operation.confirm) {
      notification?.push({
        ...operation.confirm,

        text: several ? operation.confirm.severalText?.(items) || operation.confirm.text?.(items) : operation.confirm.text?.(items),
        title: several ? operation.confirm.severalTitle?.(items) || operation.confirm.title(items) : operation.confirm.title(items),

        onConfirm: handleConfirm,
      });
    } else {
      handleConfirm();
    }
  }, [operation.confirm, notification, several, items, handleConfirm]);

  const disabled = useMemo(
    () => !!locked || !items.length || (operation.active && !operation.active(items, data instanceof Array)),
    [data, items, locked, operation]
  );
  
  const pending = useMemo(() => !!items.length && !!operation.pending?.(items), [items, operation]);
  
  if (operation.visible && !operation.visible(items, data instanceof Array)) {
    return null;
  }

  return (
    <>
      <Error text={error} onClose={() => setError(undefined)} />

      {type === 'menu' ? (
        <MenuItem
          key={operation.label}
          disabled={disabled}
          onClick={handleOperation}
        >
          {operation.label}
        </MenuItem>
      ) : (
        <>
          <Tooltip title={isGroupOperation ? operation.groupTitle?.(items) || operation.title(items) : operation.title(items)}>
            <div>
              <IconButton
                key={operation.label}
                disabled={disabled || pending}
                onClick={handleOperation}
              >
                {operation.icon(!!disabled, pending)}
              </IconButton>
            </div>
          </Tooltip>

          {!noDivider && (
            <div style={{ height: "1.5rem" }}>
              <Divider orientation="vertical" variant="middle" />
            </div>
          )}
        </>
      )}
    </>
  );
}