import React from "react";
import Button from "@material-ui/core/Button";

const CustomButton = ({
  children,
  handleOnClick,
  color = "primary",
  size = "small",
  ...props
}) => {
  return (
    <Button size={size} color={color} onClick={handleOnClick} {...props}>
      {children}
    </Button>
  );
};

export default CustomButton;
