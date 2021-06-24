import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

import backgroundImgSrc from '../assets/demo.jpg';

interface Props {
  onClick: () => void;
}

const useImageStyles = makeStyles({
  media: {
    height: "100%",
    display: "flex",
    width: "100%"
  }
});

export const Demo = ({ onClick }: Props) => {
  const classes = useImageStyles();

  return (
    <Card onClick={onClick} style={{ width: "calc(100% - 2rem)", display: "flex", position: "relative" }}>
      <CardMedia
        className={classes.media}
        image={backgroundImgSrc}
      />
    </Card>
  );
}
