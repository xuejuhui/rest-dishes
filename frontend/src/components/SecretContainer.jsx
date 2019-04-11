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
import axios from "axios";

class SecretContainer extends Component {
  state = {
    openCard: false,
    startIndex: 0,
    limit: 10,
    dish: {}
  };
  shouldComponentUpdate(nextProps, nextState) {
    return (
      Object.values(this.props.dishes).length !==
        Object.values(nextProps.dishes).length ||
      this.state.dish !== nextState.dish
    );
  }
  componentDidMount() {
    const { getAllDishes } = this.props;
    // getUserDishes();
    getAllDishes(this.state.startIndex, this.state.limit);
  }
  handleSomething = id => () => {
    axios
      .get("http://localhost:5000/api/dishes/dish/" + id)
      .then(x => this.setState({ dish: x.data }));
    this.setState({ openCard: true });
  };
  handleDeleteUserDish = id => () => {
    this.props.deleteUserDish(id);
  };
  handleMore = () => {
    this.setState({ startIndex: this.state.startIndex + this.state.limit });
    this.props.getAllDishes(this.state.startIndex, this.state.limit);
  };
  render() {
    const { dishes } = this.props;
    const { openCard, dish } = this.state;
    return (
      <Fragment>
        <DishForm />
        <DishesList
          dishes={dishes}
          handleMore={this.handleMore}
          handleSomething={this.handleSomething}
        />
        {openCard ? (
          <Secret
            dish={dish}
            handleDeleteUserDish={this.handleDeleteUserDish}
          />
        ) : (
          ""
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  console.log(Object.values(state.dish.dishes));
  return {
    dishes: state.dish.dishes,
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
