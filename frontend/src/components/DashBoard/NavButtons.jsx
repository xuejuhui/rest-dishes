import React from "react";
import CustomButton from "components/SharedComponents/CustomButton.jsx";
import { withStyles } from "@material-ui/core/styles";

const navStyles = theme => {
  return {
    navbar: {
      width: "100vw",
      display: "flex",
      marginTop: "10px",
      justifyContent: "space-evenly"
    }
  };
};

const NavButtons = ({ handleOpenPage, classes }) => {
  return (
    <div className={classes.navbar}>
      <CustomButton
        handleOnClick={handleOpenPage}
        size={"small"}
        name={"orders"}
      >
        Order
      </CustomButton>
      <CustomButton handleOnClick={handleOpenPage} name={"dashBoard"}>
        DashBoard
      </CustomButton>
      <CustomButton handleOnClick={handleOpenPage} name={"none"}>
        None
      </CustomButton>
    </div>
  );
};

export default withStyles(navStyles)(NavButtons);
