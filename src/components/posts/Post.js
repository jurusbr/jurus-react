import React, { Component } from "react";
import "./Post.css";
import PostClickable from "./PostClickable"
import PostLineChart from "./PostLineChart"
import PostGif from "./PostGif"

const Post =  (props) => {

   let analise = props.post.analise;
   let tipo = props.post.conteudo.tipo;
   
  let content;
  
  switch (tipo) {
    case "rate":{
      content = (<PostClickable content={ props.post.conteudo}></PostClickable>)
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
         <section className="author">
            <img className="photo" src={"/gus.png"} width={45} />
          </section>
          <section>
            <h4 >19/12/2017</h4>           
          </section>        
        </div>
        <div className="post-content">
          <p>{analise}</p>
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
