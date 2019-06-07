import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getOrderItems } from "../../actions/orderActions";
import DashBoard from "./DashBoard";
import Orders from "./Orders";

class DashBoardContainer extends Component {
  state = { orderPage: false };
  componentDidMount() {
    this.props.getOrderItems();
  }
  render() {
    const { orderPage } = this.state;

    return <Fragment>{orderPage ? <Orders /> : <DashBoard />}</Fragment>;
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    userDishes: state.dish.userDishes
  };
};

const mapDispatchToProps = { getOrderItems };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashBoardContainer);
