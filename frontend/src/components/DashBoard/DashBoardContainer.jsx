import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getOrderItems } from "actions/orderActions";
import DashBoard from "components/DashBoard/DashBoard";
import Orders from "components/DashBoard/Orders";
import NavButtons from "components/DashBoard/NavButtons";

class DashBoardContainer extends Component {
  state = { pageOpen: "" };
  componentDidMount() {
    this.props.getOrderItems();
  }
  handleOpenPage = e => {
    this.setState({ pageOpen: e.currentTarget.name });
  };
  render() {
    const { orders } = this.props;
    const { pageOpen } = this.state;
    const page = {
      orders: <Orders orders={orders} />,
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
    orders: state.order.orders
  };
};

const mapDispatchToProps = { getOrderItems };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashBoardContainer);
