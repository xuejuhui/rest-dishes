import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IngredientInput from "./IngredientInput";

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
    height: "auto",
    minHeight: "80vh",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  media: {
    objectFit: "cover",
    height: "18rem"
  },
  content: {
    height: "10rem",
    overflowWrap: "break-word",
    // overflow: "hidden",
    display: "flex",
    justifyContent: "space-between"
  },
  ingredient: {
    width: "8rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "rgba(173,216,230,1)",
    borderRadius: "5px",
    marginTop: "10px",
    textAlign: "center",
    background: "transparent"
  },
  ingredients: {
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "0.4rem"
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(173,216,230,.5)"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey"
    }
  }
  // scrollBar: {}
};

const DishCard = props => {
  const { classes, dish, addUserDishesIngredient, creator } = props;
  return (
    <div className={classes.main}>
      <Card className={classes.card} key={dish._id}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Dish photo"
            className={classes.media}
            height="140"
            image={dish.url[0]}
            title="Contemplative Reptile"
          />
          <CardContent className={classes.content}>
            <div>
              <Typography gutterBottom variant="h5" component="h2">
                {dish.dishName}
              </Typography>
              <Typography component="p">{dish.description}</Typography>
            </div>
            <div className={classes.ingredients}>
              {dish.ingredient.map(ingredient => {
                return (
                  <div className={classes.ingredient} key={ingredient._id}>
                    <Typography component="p">{ingredient.name}</Typography>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          {creator ? (
            <Button
              size="small"
              color="primary"
              onClick={props.handleDeleteUserDish(dish)}
            >
              Delete
            </Button>
          ) : (
            ""
          )}
          {creator ? (
            <IngredientInput
              addUserDishesIngredient={addUserDishesIngredient}
              dish={dish}
            />
          ) : (
            ""
          )}
        </CardActions>
      </Card>
    </div>
  );
};

export default withStyles(styles)(DishCard);
