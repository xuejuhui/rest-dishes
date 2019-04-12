import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { withStyles } from "@material-ui/core/styles";

import DishList from "./DishList";
import Loading from "../Loading";

const styles = theme => ({
  main: { float: "left", width: "50vw", marginTop: 10 }
});
const DishesList = props => {
  const { classes, dishes, handleMore, handleOpenCard, hasMore } = props;
  const dishesArray = Object.values(dishes);
  return (
    <div className={classes.main}>
      <InfiniteScroll
        dataLength={dishesArray.length} //This is important field to render the next data
        next={handleMore}
        hasMore={hasMore}
        loader={<Loading type="spin" color="black" />}
        endMessage={<h1>end</h1>}
      >
        {dishesArray.map(dish => {
          return (
            <DishList
              dish={dish}
              handleOpenCard={handleOpenCard}
              key={dish._id}
            />
          );
        })}
      </InfiniteScroll>
    </div>
  );
};
export default withStyles(styles)(DishesList);
