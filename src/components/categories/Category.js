import React from "react";
import { NavLink } from "react-router-dom";
import "./Category.css"

const Category =  (props) => {

     
   return (
    <div className="category-container center">

        <NavLink className="card category hover animated" to="/bonds/liquidity">
          <div className="category-header  category-liquidity">            
            <div className="category-header-text left">
              <div className="category-header-image">
                <img alt="foto" className="photo" src={"/emergency.ico"} width={45} />
              </div>
              <h4>com liquidez diaria</h4>
              <p>pode resgatar seu dinheiro a qualquer momento</p>
            </div>
          </div>
          <div className="category-body">
            <table className="category-table">
            <tbody>
              <tr>
                <td>
                  <h5>100% cdi</h5>
                  <p>maior taxa</p>
                </td>
              </tr>
              </tbody>
            </table>
          </div> 
        </NavLink>

        <NavLink className="card category hover animated" to="/bonds/short">
          <div className="category-header  category-short">            
            <div className="category-header-text left">
              <div className="category-header-image">
                <img alt="foto" className="photo" src={"/car.png"} width={45} />
              </div>
              <h4>curto prazo</h4>
            </div>
          </div>
          <div className="category-body">
          <table className="category-table">
          <tbody>
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
              </tbody>
            </table>
          </div> 
        </NavLink>

        <NavLink className="card category hover animated" to="/bonds/medium">
          <div className="category-header  category-medium">            
            <div className="category-header-text left">
              <div className="category-header-image">
                <img alt="foto" className="photo" src={"/home.png"} width={45} />
              </div>
              <h4>médio prazo</h4>
            </div>
          </div>
          <div className="category-body">
          <table className="category-table">
          <tbody>
              <tr>
                <td>3 anos</td>
                <td>120% cdi</td>
              </tr>
              <tr>
                <td>4 anos</td>
                <td>123% cdi</td>
              </tr><tr>
                <td>5 anos</td>
                <td>127% cdi</td>
              </tr>
              </tbody>
            </table>
          </div> 
        </NavLink>

        <NavLink className="card category hover animated" to="/bonds?long">
          <div className="category-header  category-long">            
            <div className="category-header-text left">
              <div className="category-header-image">
                <img alt="foto" className="photo" src={"/old.png"} width={45} />
              </div>
              <h4>longo prazo / aposentadoria</h4>
            </div>
          </div>
          <div className="category-body">
            <table className="category-table">
            <tbody>
              <tr>
                <td>
                  <h5>ipca + 7,4%</h5>
                  <p>maior taxa</p>
                </td>
              </tr>
              </tbody>
            </table>
          </div> 
        </NavLink>

        
    </div>
    );
    
   }

export default Category;
