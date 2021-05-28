import Typography from '@material-ui/core/Typography';
import { Fab } from '@material-ui/core';
import MinusIcon from '@material-ui/icons/Remove';
import PlusIcon from '@material-ui/icons/Add';

import { useCallback } from 'react';

interface CountProps {
  count: number;
  lockOnOne?: boolean;
  onChange: (count: number) => void;
}

export const Count = ({ count, lockOnOne, onChange }: CountProps) => {
  const handlePlus = useCallback(() => {
    onChange(count + 1);
  }, [ count, onChange ]);

  const handleMinus = useCallback(() => {
    onChange(count - 1);
  }, [ count, onChange ]);

  return (
    <div style={{ display: "flex", alignItems: "center", margin: "1rem 0" }}>
      <Fab color="primary" disabled={(count === 1) && lockOnOne} size="small" onClick={handleMinus}>
        <MinusIcon />
      </Fab>

      <Typography variant="h6" component="p" style={{ margin: "0 1rem" }}>
        {count} шт
      </Typography>

      <Fab color="primary" size="small" onClick={handlePlus}>
        <PlusIcon />
      </Fab>
    </div>
  );
}