import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getOrderItems } from "../../actions/orderActions";
import DashBoard from "./DashBoard";
import Orders from "./Orders";
import NavButtons from "./NavButtons";

class DashBoardContainer extends Component {
  state = { pageOpen: "" };
  componentDidMount() {
    this.props.getOrderItems();
  }
  handleOpenPage = e => {
    this.setState({ pageOpen: e.currentTarget.name });
  };
  render() {
    const { pageOpen } = this.state;
    const page = {
      orders: <Orders />,
      dashBoard: <DashBoard />,
      none: null
    };
    return (
      <Fragment>
        <NavButtons handleOpenPage={this.handleOpenPage} />
        {page[pageOpen]}
      </Fragment>
    );
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
