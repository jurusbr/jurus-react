import React from "react";
import "./Category.css"

const Category =  (props) => {

     
   return (
    <div className="category-container center">

        <div className="card category hover animated">
          <div className="category-header">
            <div className="category-header-image">
              <img alt="foto" className="photo" src={"/emergency.ico"} width={45} />
            </div>
            <div className="category-header-text left">
              <h4>liquidez diaria</h4>
              <p>Ideal para montar um fundo de emergencia</p>
            </div>
          </div>
          <div className="category-body">
            <h4 className="">101% cdi</h4>
          </div>
        </div>

        <div className="card category hover animated">
          <div className="category-header">
            <div className="category-header-image">
              <img alt="foto" className="photo" src={"/clock2.png  "} width={45} />
            </div>
            <div className="category-header-text left">
              <h4>pagamento mensal</h4>
              <p>Investimentos que pagam juros mensalmente.</p>
            </div>
          </div>
          <div className="category-body">
            <h4 className="">101% cdi</h4>
          </div>
        </div>

        <div className="card category hover animated">
          <div className="category-header">
            <div className="category-header-image">
              <img alt="foto" className="photo" src={"/car.png  "} width={45} />
            </div>
            <div className="category-header-text left">
              <h4>curto prazo</h4>
              <p>Ate 2 anos de vencimento.</p>
            </div>
          </div>
          <div className="category-body">
            <h4 className="">12,8%  ----  101% cdi  ----  ipca+5,6%</h4>
          </div>
        </div>
        
    </div>
    );
    
   }

export default Category;
