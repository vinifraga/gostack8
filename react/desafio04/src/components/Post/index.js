import React from "react";

import "./styles.css";

function Post({ data }) {
  return (
    <div key={data.id} className="Post">
      <div id="Container">
        <div id="header">
          <img src={data.author.avatar} alt="Profile picture" />
          <div id="info">
            <b>{data.author.name}</b>
            <small>{data.date}</small>
          </div>
        </div>
        <div id="content">{data.content}</div>
        {data.comments.map(comment => (
          <div key={comment.id} styles={"color: #3e3e3"}>
            {comment.content}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Post;
