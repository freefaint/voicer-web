import { useEffect } from "react";
import { useMemo, useCallback, PropsWithChildren, useState } from "react"

import { notificationContext, Notification } from "./notification.context";
import { NotificationDialog } from "./Notification.dialog";

export const NotificationProvider = ({ children }: PropsWithChildren<{}>) => {
  const [opened, setOpened] = useState(false);
  const [queue, setQueue] = useState<Notification[]>([]);
  const [item, setItem] = useState<Notification>();

  const push = useCallback((item: Notification) => {
    setQueue(queue => ([ ...queue, item ]));
  }, []);
  
  const handleClose = useCallback(() => {
    item?.onClose?.();
    setItem(undefined);
    setOpened(false);
  }, [item]);
  
  const handleConfirm = useCallback((data?: Record<string, any>) => {
    return item?.onConfirm?.(data).then(resp => {
      setItem(undefined);
      setOpened(false);
    }).catch(e => {
      if (!item.form) {
        setItem(undefined);
        setOpened(false);
      }
      return e;
    }) ?? Promise.reject();
  }, [item]);

  useEffect(() => {
    if (queue.length && !opened) {
      setOpened(true);
      setItem(queue[0]);
      setQueue(queue => queue.slice(1))
    }
  }, [opened, queue])

  const context = useMemo(() => ({ push }), [ push ]);

  return (
    <>
      {item && (
        <NotificationDialog {...item} onClose={handleClose} onConfirm={handleConfirm} />
      )}

      <notificationContext.Provider value={context}>
        {children}
      </notificationContext.Provider>
    </>
  );
}