import React from "react";

import "./styles.css";

function Comment({ data }) {
  return (
    <div className="CommentContainer">
      <img src={data.author.avatar} alt="Comment photo" />
      <div className="CommentContent">
        <b>{data.author.name}</b> <span>{data.content}</span>
      </div>
    </div>
  );
}

export default Comment;
