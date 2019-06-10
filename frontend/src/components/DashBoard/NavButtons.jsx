import React from "react";
import CustomButton from "components/SharedComponents/CustomButton.jsx";
const NavButtons = ({ handleOpenPage }) => {
  return (
    <div>
      <CustomButton
        handleOnClick={handleOpenPage}
        size={"large"}
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

export default NavButtons;
