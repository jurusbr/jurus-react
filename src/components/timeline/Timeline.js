import React, { Component } from "react";
import "./Timeline.css";
import Post from "../posts/Post"
import QuickViewer from "../quickviewer/QuickViewer"

const Timeline =  (props) => {     

   let posts = props.posts.map(p => {
      return (<Post post={p}></Post>)
   });

   let quickviewers = props.quickViewers.map(v => {
    return (<QuickViewer data={v}></QuickViewer>)
 });

   return (
      <div className="timeline">
        <div className="timeline-colum-post">{posts}</div>
        <div className="timeline-colum-recommend">{quickviewers}</div>
      </div>
    );
    
   }

export default Timeline;
