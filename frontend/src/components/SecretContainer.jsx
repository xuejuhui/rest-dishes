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
  handleDeleteUserDish = id => () => {
    this.props.deleteUserDish(id);
  };
  render() {
    const { dishes, userName, addUserDishes } = this.props;
    return (
      <Fragment>
        <DishForm />
        <Secret
          dishes={dishes}
          userName={userName}
          handleDeleteUserDish={this.handleDeleteUserDish}
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
