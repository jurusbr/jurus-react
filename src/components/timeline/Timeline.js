import React, { Component } from "react";
import "./Timeline.css";
import Post from "../posts/Post"

const Timeline =  (props) => {     

   let posts = props.posts.map(p => {
      return (<Post post={p}></Post>)
   });

   return (
      <div className="timeline">
        <div className="timeline-colum-post">{posts}</div>
      </div>
    );
    
   }

export default Timeline;
