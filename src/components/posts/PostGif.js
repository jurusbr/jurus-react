import React, { Component } from "react";
import "./Post.css";
import "./PostGif.css";

const PostGif =  (props) => {

     
   return (
     <div class="gif">
          <img src={props.post.conteudo.url} width="400" /> 
      </div>
    );
    
   }

export default PostGif;
