import React from "react";
import Button from "@material-ui/core/Button";

const CustomButton = ({ children, handleOnClick, ...props }) => {
  return (
    <Button size="small" color="primary" onClick={handleOnClick}>
      {children}
    </Button>
  );
};

export default CustomButton;
