import React from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

const commentListStyles = theme => ({
  root: {
    width: "20vw",
    maxWidth: 360,
    backgroundColor: "transparent",
    right: "45%",
    position: "fixed",
    display: "flex",
    flexDirection: "column",
    marginTop: "10px",
    top: "10%",
    bottom: 0
  },
  date: {
    display: "inline",
    fontSize: "0.75rem"
  },
  addButton: {},
  comment: {
    fontSize: "1.15rem"
  },
  inputFields: {},
  comments: {
    overflowY: "auto",
    overflowX: "hidden"
  }
});

const CommentsList = props => {
  const { classes, comments, handleChange, handleSubmit } = props;
  console.log(comments);
  return (
    <div className={classes.root}>
      <div className={classes.comments}>
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
                  classes={{ primary: classes.comment }}
                  primary={comment.message}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        className={classes.date}
                        color="textPrimary"
                      >
                        {comment.date}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
          );
        })}
      </div>
      <div className={classes.inputFields}>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="password">Message</InputLabel>
          <Input
            name="message"
            type="text"
            id="message"
            onChange={handleChange}
          />
        </FormControl>
        <Button
          className={classes.addButton}
          size="small"
          color="primary"
          onClick={handleSubmit}
        >
          Open
        </Button>
      </div>
    </div>
  );
};

export default withStyles(commentListStyles)(CommentsList);
