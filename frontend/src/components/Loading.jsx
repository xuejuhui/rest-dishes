import React from "react";
import ReactLoading from "react-loading";

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: `translate(-50%, -50%)`
};
const Loading = ({ type, color }) => {
  return (
    <div style={styles}>
      <ReactLoading type={type} color={color} height={65} width={100} />
    </div>
  );
};

export default Loading;
