import React, { Component, Fragment } from "react";
import Secret from "./Secret";
import DishForm from "./DishForm";
import { connect } from "react-redux";
import { getUserDishes,addUserDishes } from "../actions/dishActions";

class SecretContainer extends Component {
  componentDidMount() {
    const { getUserDishes } = this.props;
    getUserDishes();
  }
  render() {
    const { dishes, userName, addUserDishes } = this.props;

    return (
      <Fragment>
        <DishForm />
      <Secret dishes={dishes} userName={userName} addUserDishes={addUserDishes}/>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    dishes: state.dish.dishes,
    userName: state.dish.userName
  };
};

const mapDispatchToProps = {
  getUserDishes,
  addUserDishes
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SecretContainer);
