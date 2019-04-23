import React, { Component } from "react";
import { connect } from "react-redux";

import CommentsList from "./CommentsList";
import { getAllComments } from "../../actions/commentActions";

class CommentsContainer extends Component {
  state = {};
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
  render() {
    const { dish, user, comments } = this.props;
    return <CommentsList dish={dish} user={user} comments={comments} />;
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
  getAllComments
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsContainer);
