import React from "react";
import "./Post.css";
import "./PostClickable.css"

const PostClickable =  (props) => {

  let content = props.content;
     
   return (
     <div className="post-clickable hover animated gradient-bg1">
          <h1>{content.highlight}</h1>
          <h2>#{content.type}</h2>
      </div>
    );
    
   }

export default PostClickable;
