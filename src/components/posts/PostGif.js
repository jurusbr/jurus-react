import React from "react";
import "./Post.css";
import "./PostGif.css";

const PostGif =  (props) => {

     
   return (
     <div className="post-gif">
          <img alt="gif" src={props.post.conteudo.url} width="100%" /> 
      </div>
    );
    
   }

export default PostGif;
