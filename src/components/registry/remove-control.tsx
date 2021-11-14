import { useMemo } from "react";
import { SvgIcon } from "@material-ui/core";
import { Texts } from "types/registry/texts";
import { OperationControl } from "./operation-control";
import { Operation } from "types/registry/operation";
import { RemoveCircle } from "@material-ui/icons";

interface RemoveControlProps<T> extends Removable<T> {
  data: T[] | T;
  texts: Texts<T>;
  disabled?: boolean;
  service: (id: string | number) => Promise<void>;
  onOperation: () => void;
}

export interface Removable<T> {
  removable?: (item: T) => boolean;
  getTitle?: (item: T) => string;
}

export function RemoveControl<T extends { id: string | number }>({ data, disabled, texts, removable, getTitle, service, onOperation }: RemoveControlProps<T>) {
  const operation: Operation<T> = useMemo(() => ({
    label: "Удалить",
    title: () => texts.remove?.title ?? "Удалить",
    groupTitle: () => texts.remove?.groupTitle ?? "Удалить выбранные",
    icon: () => <SvgIcon opacity={!(data instanceof Array) || data.length ? 1 : 0.5} component={RemoveCircle} />,
    service: item => service(item.id),
    active: data => !!data.length,

    notification: texts.remove?.notification,
    confirm: texts.confirmRemove,
    error: texts.removeError,

    skip: removable && {
      condition: removable,

      dialog: {
        title: () => "Удаление элементов",
        text: items => <>Будут удалены только элементы {items.map(getTitle ?? (item => item.id)).join(', ')}. Остальные элементы удалить невозможно.</>
      }
    }    
  }), [texts.remove?.notification, texts.remove?.title, texts.remove?.groupTitle, texts.confirmRemove, texts.removeError, removable, data, service, getTitle]);

  return (
    <OperationControl
      data={data}
      type="button"
      noDivider
      disabled={disabled}
      operation={operation}
      onOperation={onOperation}
    />
  )
}