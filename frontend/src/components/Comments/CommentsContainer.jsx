import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import CommentsList from "./CommentsList";

class CommentsContainer extends Component {
  state = { comments: [] };
  componentDidMount() {
    axios
      .get(
        ` http://localhost:5000/api/comments/${this.props.dish._id}/comments`
      )
      .then(x => this.setState({ comments: x.data }));
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.dish._id !== prevProps.dish._id) {
      axios
        .get(
          ` http://localhost:5000/api/comments/${this.props.dish._id}/comments`
        )
        .then(x => this.setState({ comments: x.data }));
    }
  }
  render() {
    const { dish, user } = this.props;
    const { comments } = this.state;
    return <CommentsList dish={dish} comments={comments} />;
  }
}
const mapStateToProps = state => {
  return {
    dish: state.dish.dish,
    user: state.auth.user
  };
};
export default connect(
  mapStateToProps,
  null
)(CommentsContainer);
