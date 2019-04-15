import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import puppy from "../../utils/puppy";

const styles = {
  main: {
    marginTop: "10px",
    position: "fixed",
    right: "0",
    width: "40vw",
    top: "10%"
  },
  card: {
    display: "flex",
    width: "35vw",
    height: "80vh",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  media: {
    objectFit: "cover",
    height: "18rem"
  },
  content: {
    height: "10rem",
    overflowWrap: "break-word"
  }
};

const DishCard = props => {
  const { classes, dish } = props;
  let randomPic = puppy[Math.floor(Math.random() * (puppy.length - 1 - 0) + 0)];
  console.log(dish);
  return (
    <div className={classes.main}>
      <Card className={classes.card} key={dish._id}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            className={classes.media}
            height="140"
            image={dish.image[0]}
            title="Contemplative Reptile"
          />
          <CardContent className={classes.content}>
            <Typography gutterBottom variant="h5" component="h2">
              {dish.dishName}
            </Typography>
            <Typography component="p">{dish.description}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={props.handleDeleteUserDish(dish._id)}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default withStyles(styles)(DishCard);
