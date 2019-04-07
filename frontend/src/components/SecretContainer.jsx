import React, { Component } from "react";
import Secret from "./Secret";
import { connect } from "react-redux";
import { getUserDishes } from "../actions/dishActions";

class SecretContainer extends Component {
  componentDidMount() {
    const { getUserDishes } = this.props;
    getUserDishes();
  }
  render() {
    const { dishes, userName } = this.props;
    return <Secret dishes={dishes} userName={userName} />;
  }
}

const mapStateToProps = state => {
  return {
    dishes: state.dish.dishes,
    userName: state.dish.userName
  };
};

const mapDispatchToProps = {
  getUserDishes
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SecretContainer);
