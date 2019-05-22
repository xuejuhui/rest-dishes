import React from "react";
import { connect } from "react-redux";
import { getCartItems, editCart, postOrder } from "../../actions/orderActions";

import DisplayDishes from "./DisplayDishes";

class CartContainer extends React.Component {
  state = {};
  componentDidMount() {
    this.props.getCartItems();
  }
  handleEditCart = dish => e => {
    const { editCart } = this.props;
    editCart(dish, Number(e.target.value));
  };
  handlePostOrder = () => {
    const { postOrder, cart } = this.props;
    postOrder(cart);
  };
  render() {
    const { cartWithProduct } = this.props;
    return (
      <div>
        <DisplayDishes
          cartWithProduct={cartWithProduct}
          handleEditCart={this.handleEditCart}
          handlePostOrder={this.handlePostOrder}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  console.log(state.order);
  return {
    cartWithProduct: state.order.cartWithProduct,
    cart: state.order.cart
  };
};

const mapDispatchToProps = { getCartItems, editCart, postOrder };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartContainer);
