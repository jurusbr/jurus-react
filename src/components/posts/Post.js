import React from "react";
import "./Post.css";
import PostClickable from "./PostClickable"
import PostLineChart from "./PostLineChart"
import PostGif from "./PostGif"

const Post =  (props) => {

   let summary = props.post.summary;
   let type = props.post.type;
   
  let content = null;
  
  switch (type) {
    case "tesourodireto":{
      content = (<PostClickable content={ props.post}></PostClickable>)
      break;
    }
    case "medium":{
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
    <div className="post">
        <div className="post-header">
         <section className="post-header-author">
            <img alt="foto" className="photo" src={"/gus.png"} width={45} />
          </section>
          <section>
            <h4 >19/12/2017</h4>           
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
