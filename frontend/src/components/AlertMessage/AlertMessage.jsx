import { Component } from "react";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import { removeSnackbar } from "../../actions/alertActions";

class AlertMessage extends Component {
  displayed = [];
  storeDisplayed = id => {
    this.displayed = [...this.displayed, id];
  };
  componentDidUpdate() {
    const { notifications = [] } = this.props;

    notifications.forEach(notification => {
      // Do nothing if snackbar is already displayed
      if (this.displayed.includes(notification.key)) return;
      // Display snackbar using notistack
      this.props.enqueueSnackbar(notification.message, notification.options);
      // Keep track of snackbars that we've displayed
      this.storeDisplayed(notification.key);
      // Dispatch action to remove snackbar from redux store
      this.props.removeSnackbar(notification.key);
    });
  }
  render() {
    return null;
  }
}

const mapStateToProps = state => {
  return {
    notifications: state.alert.notifications
  };
};
const mapDispatchToProps = {
  removeSnackbar
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(AlertMessage));
