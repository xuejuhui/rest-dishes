import React from "react";

const CommentsList = props => {
  console.log(props);
  return (
    <div>
      {props.comments.map(x => {
        return <p key={x._id}>{x.message}</p>;
      })}
    </div>
  );
};

export default CommentsList;
