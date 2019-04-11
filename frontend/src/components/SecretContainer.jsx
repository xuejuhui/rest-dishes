import React, { Component, Fragment } from "react";
import Secret from "./Secret";
import DishForm from "./DishForm";
import { connect } from "react-redux";
import {
  getUserDishes,
  deleteUserDish,
  getAllDishes
} from "../actions/dishActions";
import DishesList from "./DishesList";

class SecretContainer extends Component {
  state = {
    startIndex: 0,
    limit: 10
  };
  componentDidMount() {
    const { getUserDishes, getAllDishes } = this.props;
    // getUserDishes();
    getAllDishes(this.state.startIndex, this.state.limit);
  }
  handleDeleteUserDish = id => () => {
    this.props.deleteUserDish(id);
  };
  handleMore = () => {
    this.setState({ startIndex: this.state.startIndex + this.state.limit });
    this.props.getAllDishes(this.state.startIndex, this.state.limit);
  };
  render() {
    const { dishes, userName, allDishes } = this.props;
    return (
      <Fragment>
        <DishForm />
        <DishesList dishes={allDishes} handleMore={this.handleMore} />
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
  console.log(Object.values(state.dish.allDishes));
  return {
    dishes: state.dish.dishes,
    allDishes: state.dish.allDishes,
    userName: state.dish.userName
  };
};

const mapDispatchToProps = {
  getUserDishes,
  deleteUserDish,
  getAllDishes
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SecretContainer);
