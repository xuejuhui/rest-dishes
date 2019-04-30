import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserDishes } from "../../actions/dishActions";

class UserProfileContianer extends Component {
  componentDidMount() {
    this.props.getUserDishes();
  }
  render() {
    const { userDishes } = this.props;
    return (
      <div>
        {Object.values(userDishes).map(x => (
          <h1 key={x._id}>{x.dishName}</h1>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    userDishes: state.dish.userDishes
  };
};

const mapDispatchToProps = { getUserDishes };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileContianer);
