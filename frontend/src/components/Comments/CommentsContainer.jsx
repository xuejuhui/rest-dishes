import React, { Component } from "react";
import { connect } from "react-redux";

import CommentsList from "./CommentsList";
import { getAllComments, postComment } from "../../actions/commentActions";

class CommentsContainer extends Component {
  state = { message: "" };
  componentDidMount() {
    const { getAllComments, dish } = this.props;
    getAllComments(dish);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.dish._id !== prevProps.dish._id) {
      const { getAllComments, dish } = this.props;
      getAllComments(dish);
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.message === this.state.message;
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.postComment({ ...this.state, dishId: this.props.dish._id });
  };
  render() {
    const { dish, user, comments } = this.props;
    return (
      <CommentsList
        dish={dish}
        user={user}
        comments={comments}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}
const mapStateToProps = state => {
  return {
    dish: state.dish.dish,
    user: state.auth.user,
    comments: state.comment.comments
  };
};
const mapDispatchToProps = {
  getAllComments,
  postComment
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsContainer);
