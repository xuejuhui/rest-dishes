import React, { Fragment } from "react";

import { withStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";

const useStyles = theme => {
  console.log(theme);
  return {
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    },
    nested: {
      paddingLeft: "2rem",
      display: "flex"
    },
    order: {
      width: 10
    },
    orderCompleted: {
      paddingLeft: "2rem",
      display: "flex",
      color: "#999",
      textDecoration: "line-through"
    }
  };
};

const Orders = ({ orders, classes, handleCompletion }) => {
  const [open, setOpen] = React.useState(false);
  const [which, setWhich] = React.useState("");
  function handleClick(e) {
    setWhich(e.currentTarget.id);
    setOpen(!open);
    if (which !== e.currentTarget.id) {
      setOpen(true);
    }
  }

  return (
    <Fragment>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Orders
          </ListSubheader>
        }
        className={classes.root}
      />
      {Object.values(orders).map(order => {
        return (
          <div key={order._id}>
            <ListItem button onClick={handleClick} id={order._id}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary={order.date} />
              <ListItemText primary={order.user_id.email} />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
              in={which === order._id && open}
              timeout="auto"
              unmountOnExit
              id={order._id}
            >
              <List component="div" disablePadding>
                {order.dishes.map(dish => {
                  return (
                    <ListItem
                      button
                      className={
                        dish.dishCompleted
                          ? classes.orderCompleted
                          : classes.nested
                      }
                      key={dish._id}
                      onClick={handleCompletion(order, dish)}
                    >
                      <ListItemText
                        className={classes.order}
                        primary={dish.dish.dishName}
                      />
                      <ListItemText
                        primary={dish.qty}
                        className={classes.order}
                      />

                      {dish.dishCompleted ? (
                        "Completed"
                      ) : (
                        <ListItemIcon>
                          <StarBorder />
                        </ListItemIcon>
                      )}
                    </ListItem>
                  );
                })}
              </List>
            </Collapse>
          </div>
        );
      })}
    </Fragment>
  );
};

export default withStyles(useStyles)(Orders);
