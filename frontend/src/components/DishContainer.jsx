import React, { Component, Fragment } from "react";
import DishCard from "./DishCard";
import DishForm from "./DishForm";
import { connect } from "react-redux";
import { deleteUserDish, getAllDishes } from "../actions/dishActions";
import DishesList from "./DishesList";
import axios from "axios";
import Button from "./Button";

class DishContainer extends Component {
  state = {
    openCard: false,
    openForm: false,
    startIndex: 0,
    limit: 10,
    dish: {}
  };
  shouldComponentUpdate(nextProps, nextState) {
    return (
      Object.values(this.props.dishes).length !==
        Object.values(nextProps.dishes).length ||
      this.state.dish !== nextState.dish ||
      this.state.openForm !== nextState.openForm
    );
  }
  componentDidMount() {
    const { getAllDishes } = this.props;
    getAllDishes(this.state.startIndex, this.state.limit);
  }
  handleSomething = id => () => {
    const { dishes } = this.props;
    this.setState({ dish: dishes[id], openCard: true });
  };
  handleDeleteUserDish = id => () => {
    this.props.deleteUserDish(id);
  };
  handleMore = () => {
    this.setState({ startIndex: this.state.startIndex + this.state.limit });
    this.props.getAllDishes(this.state.startIndex, this.state.limit);
  };
  handleOpenForm = () => {
    this.setState({ openForm: !this.state.openForm });
  };
  render() {
    const { dishes } = this.props;
    const { openCard, dish, openForm } = this.state;
    return (
      <Fragment>
        {openForm ? (
          <Fragment>
            <DishForm
              openForm={this.state.openForm}
              handleOpenForm={this.handleOpenForm}
            />
            <Button handleOpenForm={this.handleOpenForm} />
          </Fragment>
        ) : (
          <Button handleOpenForm={this.handleOpenForm} />
        )}
        <DishesList
          dishes={dishes}
          handleMore={this.handleMore}
          handleSomething={this.handleSomething}
        />
        {openCard ? (
          <DishCard
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
  deleteUserDish,
  getAllDishes
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DishContainer);
