import { Button, Fab, Grid, Typography } from "@material-ui/core";
import ExitIcon from '@material-ui/icons/ExitToAppRounded';
import { ChangeEvent, useCallback, useRef } from "react";
import { useCommand } from "../../hooks/useCommand";

import { Product } from "../../types/product";

import { ProductItem } from "./item";

interface Props extends React.HTMLProps<HTMLDivElement> {
  products: Product[];
  admin?: boolean;
  onCommand: () => void;
  onLogout: () => void;
  onSelectProduct: (id: string) => void;
  onUpload: (products: Product[]) => void;
  onAdd: () => void;
  onClear: () => void;
  onRemove: (product: Product) => void;
}

export const ProductList = ({ admin, products, style, onLogout, onRemove, onAdd, onClear, onCommand, onSelectProduct, onUpload }: Props) => {
  const container = useRef<HTMLDivElement | null>(null);

  useCommand('вниз', () => {
    if (!container.current) {
      return;
    }

    onCommand();
    container.current.scrollTop = container.current.clientHeight + container.current.scrollTop;
  });

  useCommand('вверх', () => {
    if (!container.current) {
      return;
    }

    onCommand();
    container.current.scrollTop = container.current.scrollTop - container.current.clientHeight;
  });

  const handleImport = useCallback(() => {
    ref.current?.click();
  }, []);

  const ref = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files![0], "UTF-8");
    fileReader.onload = ev => {
      try {
        const json = JSON.parse(ev.target?.result as string);

        onUpload(json);

        if (ref.current) {
          // @ts-ignore
          ref.current.value = '';
        }
      } catch {
        console.log('UPLOAD ERROR, CHECK JSON');
      }
    };
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", ...style }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography gutterBottom variant="h2" component="h2">
          Наше меню
        </Typography>

        <div style={{ display: "flex", justifyContent: "center" }}>
          {admin && (
            <div style={{ display: "flex" }}>
              <Button color="primary" onClick={onAdd}>Добавить товар</Button>
              <Button color="secondary" onClick={onClear}>Очистить базу</Button>
              <Button onClick={handleImport}>Импортировать</Button>
              <input key={products.length} ref={ref} style={{ visibility: "hidden" }} type="file" onChange={handleChange} />
            </div>
          )}
          <Fab color="secondary" onClick={onLogout} style={{ position: "absolute", top: "1rem", right: "1rem" }}>
            <ExitIcon />
          </Fab>
        </div>
      </div>

      <div ref={container} style={{ display: "flex", overflow: "auto", scrollBehavior: "smooth" }}>
        <Grid container spacing={0} style={{ margin: "none" }} >
          {products.map(product => (
            <Grid key={product._id} item xs={3}>
              <ProductItem admin={admin} onRemove={onRemove} product={product} onSelect={onSelectProduct} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  )
}