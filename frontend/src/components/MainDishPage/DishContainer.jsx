import React, { Component, Fragment } from "react";
import DishCard from "./DishCard";
import DishForm from "./DishForm";
import { connect } from "react-redux";
import DishesList from "./DishesList";
import Button from "../Button";

import {
  deleteUserDish,
  getAllDishes,
  addUserDishesIngredient,
  getDish
} from "../../actions/dishActions";

class DishContainer extends Component {
  state = {
    openCard: false,
    openForm: false,
    startIndex: 0,
    limit: 10,
    creator: false
  };
  // shouldComponentUpdate(nextProps, nextState) {
  //   // prevent card from rerender
  //   return (
  //     Object.values(this.props.dishes).length !==
  //       Object.values(nextProps.dishes).length ||
  //     this.state.openCard !== nextState.openCard ||
  //     this.state.openForm !== nextState.openForm ||
  //     this.props.hasMore !== nextProps.hasMore
  //   );
  // }
  componentDidMount() {
    const { getAllDishes } = this.props;
    getAllDishes(this.state.startIndex, this.state.limit);
  }
  handleOpenCard = ({ user_id, _id }) => () => {
    const {
      user: { id }
    } = this.props;
    const { getDish } = this.props;
    getDish(_id);
    this.setState({ openCard: true });
    if (user_id._id === id) {
      this.setState({ creator: true });
    } else {
      this.setState({ creator: false });
    }
  };
  handleDeleteUserDish = () => () => {
    const {
      user: { id },
      dish
    } = this.props;
    if (dish.user_id._id === id) {
      this.props.deleteUserDish(dish._id);
      this.setState({ openCard: false });
    }
  };
  handleMore = () => {
    this.setState({ startIndex: this.state.startIndex + this.state.limit });
    this.props.getAllDishes(this.state.startIndex, this.state.limit);
  };
  handleOpenForm = () => {
    this.setState({ openForm: !this.state.openForm });
  };
  render() {
    const { dishes, hasMore, addUserDishesIngredient, dish } = this.props;
    const { openCard, openForm, creator } = this.state;
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
          handleOpenCard={this.handleOpenCard}
          hasMore={hasMore}
        />
        {openCard ? (
          <DishCard
            creator={creator}
            dish={dish}
            handleDeleteUserDish={this.handleDeleteUserDish}
            addUserDishesIngredient={addUserDishesIngredient}
          />
        ) : (
          ""
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    dish: state.dish.dish,
    hasMore: state.dish.hasMore,
    dishes: state.dish.dishes,
    user: state.auth.user
  };
};

const mapDispatchToProps = {
  deleteUserDish,
  getAllDishes,
  addUserDishesIngredient,
  getDish
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DishContainer);
