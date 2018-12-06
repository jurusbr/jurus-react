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
              <h4>com liquidez diaria</h4>
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
              <h4>com pagamento mensal</h4>
              <p>Investimentos que pagam juros mensalmente.</p>
            </div>
          </div>
          <div className="category-body">
            <h4 className="">100% cdi</h4>
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
            <table className="category-table">
              <tr>
                <td>6 meses</td>
                <td>103% cdi</td>
              </tr>
              <tr>
                <td>1 ano</td>
                <td>112% cdi</td>
              </tr><tr>
                <td>2 anos</td>
                <td>115% cdi</td>
              </tr>
            </table>
          </div>          
        </div>

         <div className="card category hover animated">
          <div className="category-header">
            <div className="category-header-image">
              <img alt="foto" className="photo" src={"/home.png  "} width={45} />
            </div>
            <div className="category-header-text left">
              <h4>médio prazo</h4>
              <p>De 2 anos a 5 anos de vencimento.</p>
            </div>
          </div>
          <div className="category-body">
            <table className="category-table">
              <tr>
                <td>6 meses</td>
                <td>103% cdi</td>
              </tr>
              <tr>
                <td>1 ano</td>
                <td>112% cdi</td>
              </tr><tr>
                <td>2 anos</td>
                <td>115% cdi</td>
              </tr>
            </table>
          </div>
          
        </div>
        
    </div>
    );
    
   }

export default Category;
