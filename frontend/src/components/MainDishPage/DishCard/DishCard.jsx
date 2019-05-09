import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Rating from "react-rating";
import EmptyStar from "@material-ui/icons/StarBorder";
import FilledStar from "@material-ui/icons/Star";

import IngredientInput from "./Ingredient/IngredientInput";
import IngredientDisplay from "./Ingredient/IngredientDisplay";
import CustomButton from "./CustomButton";

const styles = theme => {
  return {
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
    star: {},

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
  };
};

const DishCard = props => {
  const {
    classes,
    dish,
    addUserDishesIngredient,
    creator,
    handleOpenComments,
    handleDeleteUserDish,
    hanldleSubmitRating,
    user,
    handleOrdering
  } = props;
  return (
    <div className={classes.main}>
      <Card className={classes.card} key={dish._id}>
        <CardMedia
          component="img"
          alt="Dish photo"
          className={classes.media}
          height="140"
          image={dish.url[0]}
          title="Contemplative Reptile"
        />
        {dish.rating.filter(e => e.user_id === user.id).length > 0 ? (
          <Rating
            initialRating={dish.avgRating}
            readonly
            emptySymbol={<EmptyStar color="primary" />}
            fullSymbol={<FilledStar color="primary" />}
          />
        ) : (
          <Rating
            initialRating={dish.avgRating}
            onChange={hanldleSubmitRating(dish)}
            emptySymbol={<EmptyStar color="primary" />}
            fullSymbol={<FilledStar color="primary" />}
          />
        )}
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
                <IngredientDisplay
                  ingredient={ingredient}
                  key={ingredient._id}
                />
              );
            })}
          </div>
        </CardContent>
        <CardActions>
          <CustomButton handleOnClick={handleOpenComments}>Open</CustomButton>
          {creator ? (
            <CustomButton handleOnClick={handleDeleteUserDish}>
              Delete
            </CustomButton>
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
          <CustomButton handleOnClick={handleOrdering}>Order</CustomButton>
        </CardActions>
      </Card>
    </div>
  );
};

export default withStyles(styles)(DishCard);
