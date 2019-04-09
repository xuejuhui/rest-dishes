import React, { Component, Fragment } from "react";
import Secret from "./Secret";
import DishForm from "./DishForm";
import { connect } from "react-redux";
import {
  getUserDishes,
  addUserDishes,
  deleteUserDish
} from "../actions/dishActions";

class SecretContainer extends Component {
  componentDidMount() {
    const { getUserDishes } = this.props;
    getUserDishes();
  }
  render() {
    const { dishes, userName, addUserDishes, deleteUserDish } = this.props;
    return (
      <Fragment>
        <DishForm />
        <Secret
          dishes={dishes}
          userName={userName}
          deleteUserDish={deleteUserDish}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.dish);
  return {
    dishes: state.dish.dishes,
    userName: state.dish.userName
  };
};

const mapDispatchToProps = {
  getUserDishes,
  addUserDishes,
  deleteUserDish
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SecretContainer);
