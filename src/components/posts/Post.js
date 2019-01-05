import React from "react";
import "./Post.css";
import PostClickable from "./PostClickable"
import PostLineChart from "./PostLineChart"
import PostGif from "./PostGif"

const Post =  (props) => {

   let summary = props.post.summary;
   let type = props.post.type;
   
  let content = null;
  let postClassName = "post";
  
  switch (type) {
    case "tesourodireto":{
      postClassName += " hover animated ";
      content = (<PostClickable content={ props.post}></PostClickable>)
      break;
    }
    case "medium":{
      postClassName += " hover animated ";
      content = (<PostClickable content={ props.post}></PostClickable>)
      break;
    }
    case "grafico-multlinear":{
      content = (<PostLineChart series={props.post.conteudo.series} data={props.post.conteudo.data} ></PostLineChart>)
      break;
    }
    case "gif":{
      content = (<PostGif post={props.post} ></PostGif>)
      break;
    }
    default:
     content = null;
      break;
  }

     
   return (
    <div className={postClassName}>
        <div className="post-header">
         <section className="post-header-author">
            <img alt="foto" className="photo" src={"/gus.png"} width={35} />
          </section>
          <section className="post-header-date">
            <h5 >19/12/2017</h5>     
            <h4 >#guga</h4>        
          </section>        
        </div>
        <div className="post-content">
          <p>{summary}</p>
        </div>
        <div className="post-image">      
         {content}    
        </div>
        <div className="post-footer">          
        </div>
      </div>
    );
    
   }

export default Post;
