import React from "react";
import { connect } from "react-redux";
import { getCartItems } from "../actions/orderActions";

class CartContainer extends React.Component {
  state = {};
  componentDidMount() {
    this.props.getCartItems();
  }
  render() {
    const { cartWithProduct } = this.props;
    return (
      <div>
        {cartWithProduct.map(dish => {
          return (
            <div key={dish._id}>
              <h5>{dish.dishName}</h5>
              <h5>{dish.qty}</h5>
            </div>
          );
        })}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    cartWithProduct: state.order.cartWithProduct
  };
};

const mapDispatchToProps = { getCartItems };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartContainer);
