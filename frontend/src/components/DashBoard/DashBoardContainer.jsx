import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getOrderItems } from "actions/orderActions";
import DashBoard from "components/DashBoard/DashBoard";
import Orders from "components/DashBoard/Orders";
import NavButtons from "components/DashBoard/NavButtons";
import persistStore from "store";

const { store, persistor } = persistStore;

class DashBoardContainer extends Component {
  state = { pageOpen: "" };
  componentDidMount() {
    this.props.getOrderItems();
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.orders !== nextProps.orders ||
      this.state.pageOpen !== nextState.pageOpen
    );
  }
  handleOpenPage = e => {
    this.setState({ pageOpen: e.currentTarget.name });
  };
  handleCompletion = (order, dish) => () => {
    store.dispatch({ type: "ORDER_COMPLETED", payload: { order, dish } });
    console.log(dish);
  };
  render() {
    const { orders } = this.props;
    const { pageOpen } = this.state;
    const page = {
      orders: (
        <Orders orders={orders} handleCompletion={this.handleCompletion} />
      ),
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
  console.log(state.order.orders);
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
