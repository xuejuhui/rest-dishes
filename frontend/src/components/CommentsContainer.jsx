import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
class CommentsContainer extends Component {
  state = {};
  componentDidMount() {
    axios.get(
      ` http://localhost:5000/api/comments/${this.props.dish._id}/comments`
    );
  }
  render() {
    const { dish, user } = this.props;
    return <div>what sup</div>;
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
