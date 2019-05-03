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
          <div key={x._id}>
            <h1>{x.dishName}</h1>
            <img src={x.url} alt={x.dishName} />
          </div>
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
