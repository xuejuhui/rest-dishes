import React from "react";
import Button from "@material-ui/core/Button";

const CustomButton = ({
  children,
  handleOnClick,
  color = "primary",
  size = "small",
  variant = "contained",
  ...props
}) => {
  return (
    <Button
      size={size}
      color={color}
      onClick={handleOnClick}
      variant={variant}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
