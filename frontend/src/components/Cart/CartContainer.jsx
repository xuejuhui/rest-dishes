import React from "react";
import { connect } from "react-redux";
import { getCartItems, editCart } from "../../actions/orderActions";

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
  render() {
    const { cartWithProduct } = this.props;
    console.log(cartWithProduct);
    return (
      <div>
        <DisplayDishes
          cartWithProduct={cartWithProduct}
          handleEditCart={this.handleEditCart}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    cartWithProduct: state.order.cartWithProduct
  };
};

const mapDispatchToProps = { getCartItems, editCart };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartContainer);
