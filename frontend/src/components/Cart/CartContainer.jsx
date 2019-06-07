import React from "react";
import { connect } from "react-redux";
import { getCartItems, editCart, postOrder } from "../../actions/orderActions";

import DisplayDishes from "./DisplayDishes";

class CartContainer extends React.Component {
  state = {
    cartValue: {}
  };
  componentDidMount() {
    // this.props.getCartItems();
  }
  // componentWillUnmount() {
  //   //todo error
  //   const { cartValue } = this.state;
  //   if (
  //     !(
  //       Object.entries(cartValue).length === 0 &&
  //       cartValue.constructor === Object
  //     )
  //   ) {
  //     this.handleEditCart();
  //   }
  //   console.log(cartValue, !Object.entries(cartValue).length === 0);
  // }
  handleCartValue = dish => e => {
    this.setState({
      cartValue: {
        ...this.state.cartValue,
        [dish._id]: { dish: dish._id, qty: Number(e.target.value) }
      }
    });
  };
  handleEditCart = () => {
    const { editCart } = this.props;
    editCart(Object.values(this.state.cartValue));
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
          handleCartValue={this.handleCartValue}
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
