import React, { Component } from "react";
import "./Post.css";
import "./PostClickable.css"

const PostClickable =  (props) => {

  let content = props.content;
     
   return (
     <div class="card-content-principal hover animated gradient-bg1">
          <h1>{content.titulo}</h1>
          <h2>{content.texto}</h2>
      </div>
    );
    
   }

export default PostClickable;
