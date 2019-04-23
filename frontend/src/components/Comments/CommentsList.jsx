import React from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const commentListStyles = theme => ({
  root: {
    width: "20vw",
    maxWidth: 360,
    backgroundColor: "transparent",
    right: "45%",
    position: "fixed",
    marginTop: "10px",
    top: "10%",
    overflow: "auto"
  },
  inline: {
    display: "inline"
  },
  addButton: {}
});

const CommentsList = props => {
  const { classes, comments } = props;
  return (
    <div className={classes.root}>
      {Object.values(comments).map(comment => {
        return (
          <List key={comment._id}>
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  alt="Remy Sharp"
                  src="https://media.tenor.com/images/d2a66d5463d62d8bdc190e0133783a92/tenor.gif"
                />
              </ListItemAvatar>
              <ListItemText
                primary={comment.date}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {comment.message}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        );
      })}{" "}
      <Button
        className={classes.addButton}
        size="small"
        color="primary"
        onClick={() => {
          alert("Im sleepy");
        }}
      >
        Open
      </Button>
    </div>
  );
};

export default withStyles(commentListStyles)(CommentsList);
