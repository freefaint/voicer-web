import { useState, useMemo, useContext, useCallback, ReactNode } from 'react';
import styled from 'styled-components';

import { Paper, Typography, Divider, IconButton, Tooltip } from '@material-ui/core';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { usePropsState } from 'avrora';

import { Operation } from 'types/registry/operation';
import { Texts } from 'types/registry/texts';
import { FieldError, ValidationError } from 'types/registry/error';
import { Card } from 'types/registry/schema';

import { notificationContext } from 'contexts/notification/notification.context';

import { Controls } from './controls';
import { Tabs } from './tabs';

import { Removable } from '../remove-control';

const Body = styled.div`
  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

interface ItemProps<T> extends Removable<T> {
  item: T;
  tab?: string;
  icon?: ReactNode;
  creating?: boolean;
  card: Card<T>;
  operations: Operation<T>[];
  loading?: boolean;
  texts: Texts<T>;
  errors?: ValidationError<T>[];
  removeService?: (id: string | number) => Promise<void>;
  onClose?: () => void;
  onSave: (item: T) => Promise<T>;
  onOpenTab?: (item?: string) => void;
  onOperation: () => void;
  onChange?: () => void;
}

export function Item<T extends { id: string | number }>({
  item: propsItem,
  icon,
  tab,
  card,
  operations,
  creating,
  loading,
  texts,
  errors,
  removeService,
  onClose,
  onSave,
  onOpenTab,
  onOperation,
  onChange
}: ItemProps<T>) {
  const notification = useContext(notificationContext);

  const [fieldErrors, setFieldErrors] = useState<FieldError[]>([]);

  const [changing, setChanging] = useState(creating);
  const { value: item, set: setItem, reset } = usePropsState(propsItem);

  const changed = useMemo(() => JSON.stringify(propsItem) !== JSON.stringify(item), [item, propsItem]);

  const currentTab = useMemo(() => card.tabs?.find(i => i.name === tab), [card.tabs, tab]);

  const TabComponent = useMemo(() => !tab ? card.tabs?.[0].Component : card.tabs?.find(i => i.name === tab)?.Component, [tab, card.tabs]);

  const handleSave = useCallback(() => {
    const invalidFields = errors?.filter(i => !!i.invalid(item));

    if (invalidFields?.length) {
      if (onOpenTab && !invalidFields.find(i => currentTab?.errors?.includes(i.name))) {
        let needTab = card.tabs?.find(i => invalidFields.find(j => i.errors?.includes(j.name)));

        if (needTab) {
          onOpenTab(needTab?.name)
        }
      }

      return setFieldErrors(invalidFields);
    }

    setFieldErrors([]);

    onSave(item).then(() => {
      setChanging(false);

      if (texts.saveNotification) {
        notification?.push({
          alert: true,
          title: texts.saveNotification.title(!!creating),
          text: texts.saveNotification.text(!!creating),
        })
      }

      onChange?.();
    }).catch(e => {
      notification?.push({
        alert: true,
        title: "Ошибка",
        text: e.response.data.title
      });
    });
  }, [errors, onSave, item, onOpenTab, currentTab?.errors, card.tabs, texts.saveNotification, onChange, notification, creating])

  const handleCancel = useCallback(() => {
    reset();
    setFieldErrors([]);
    setChanging(false);
  }, [reset, setChanging]);

  return (
    <main style={{ padding: "1rem", height: `calc(100vh - 6rem)` }}>
      <Paper elevation={3} style={{ display: "flex", flexDirection: "column", maxHeight: "100%" }}>
        <div style={{ padding: "0.75rem 1.5rem", height: "3rem", display: "flex", alignItems: "center" }}>
          {onClose && icon && (
            <>
              <Tooltip title={texts.registryTitle}>
                <IconButton onClick={() => onClose()}>
                  {icon}
                </IconButton>
              </Tooltip>

              <div style={{ opacity: "0.4", margin: "0 1.5rem 0 1rem" }}>
                <ChevronRightIcon />
              </div>
            </>
          )}

          <Typography variant="h5">{creating ? texts.getCreateTitle() : texts.getTitle(propsItem)}</Typography>
        </div>

        <Divider />

        <div style={{ padding: "0.75rem 1.5rem", height: "3rem" }}>
          <Controls
            item={item}
            changing={!!changing}
            changed={changed}
            operations={operations}
            loading={loading}
            texts={texts}
            info={card.status?.(item)}
            removeService={removeService}
            onChange={() => setChanging(true)}
            onCancel={() => {
              if (!changed) {
                creating ? onClose?.() : handleCancel()
              } else {
                notification?.push({
                  title: "Сброс изменений",
                  text: "Вы уверены, что хотите отменить изменения?",
                  onConfirm: () => new Promise(resolve => {
                    creating ? onClose?.() : handleCancel();
                    resolve();
                  })
                })
              }
            }}
            onSave={handleSave}
            onOperation={onOperation}
          />
        </div>

        <Divider />

        {card.tabs && (
          <Tabs name={tab} item={item} tabs={card.tabs} onChange={onOpenTab ?? (() => void 0)} />
        )}

        <Body style={{ display: "flex", flexDirection: "column", overflow: "auto" }}>
          {TabComponent && (
            <TabComponent
              item={item}
              errors={fieldErrors}
              creating={creating}
              onChange={setItem}
              editing={!!changing && !loading}
            />
          )}
        
          {card.Component && (
            <card.Component
              item={item}
              errors={fieldErrors}
              creating={creating}
              onChange={setItem}
              editing={!!changing && !loading}
            />
          )}
        </Body>
      </Paper>
    </main>
  );
}
