import React, { Component, Fragment } from "react";
import Secret from "./Secret";
import DishForm from "./DishForm";
import { connect } from "react-redux";
import { getUserDishes, deleteUserDish } from "../actions/dishActions";
import DishesList from "./DishesList";

class SecretContainer extends Component {
  componentDidMount() {
    const { getUserDishes } = this.props;
    getUserDishes();
  }
  handleDeleteUserDish = id => () => {
    this.props.deleteUserDish(id);
  };
  render() {
    const { dishes, userName } = this.props;
    return (
      <Fragment>
        <DishForm />
        <DishesList dishes={dishes} />
        {/*<Secret
          dishes={dishes}
          userName={userName}
          handleDeleteUserDish={this.handleDeleteUserDish}
        />*/}
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
  deleteUserDish
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SecretContainer);
