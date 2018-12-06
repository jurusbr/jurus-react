import React, { Component } from 'react';
import "./_PostCrud.css"
import Api from '../../Api';

class _PostCrud extends Component {

    constructor(props) {
        super(props);
        this.state = {summary: '', type:'default', highlight:'', url:''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleComplementChange = this.handleComplementChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUrlChange = this.handleUrlChange.bind(this);

        this.api = new Api();
      }
    
      handleChange(event) {
        this.setState({summary: event.target.value});
      }

      handleTypeChange(event) {
        console.log(event.target.value);
        this.setState({
            type: event.target.value
        });
      }
      
      handleComplementChange(event){
        this.setState({highlight: event.target.value});
      }

      handleUrlChange(event){
        this.setState({url: event.target.value});
      }
    
      handleSubmit(event) {
        console.log('A name was submitted: ' + this.state.summary + " - " + this.state.type + " - " + this.state.highlight);
        event.preventDefault();

        let json = {
            type:this.state.type,
            auto:"gustavo",
            summary:this.state.summary,
            highlight:this.state.highlight,
            url:this.state.url
        }

        this.api.newPost(json, (res) => {
            console.log(res);
            this.setState({summary: '', type:'default', highlight:''});
        });

      }
    

  render() {
    return (
      <div className="crud">
        <form onSubmit={this.handleSubmit}>
        <textarea className="crud-area" value={this.state.summary} onChange={this.handleChange} placeholder="Qual a analise hj?" cols="30" rows="10"/>
        <div>
            <ul className="no-bullet">
                <li>
                    <label><input type="radio" onChange={this.handleTypeChange} checked={this.state.type==='default'} name="topic" value="default" />Default</label>
                </li>
                <li>
                    <label><input type="radio" onChange={this.handleTypeChange} name="topic" value="td" checked={this.state.type==='td'}/>Tesouro Direto</label>
                </li>
                <li>
                    <label><input type="radio" onChange={this.handleTypeChange} name="topic" value="url" checked={this.state.type==='url'}/>Url</label>
                </li>
                <li>
                    <label><input type="radio" name="topic" value="maiortaxa"/>Maior taxa</label>
                </li>
                <li>
                    <label><input type="radio" name="topic" value="difuturo"/>Di Futuro</label>
                </li>
                <li>
                    <label><input type="radio" name="topic" value="dipassado"/>Di Passado</label>
                </li>
                <li>
                    <label><input type="radio" name="topic" value="ipcafuturo"/>IPCA Futuro</label>
                </li>
                <li>
                    <label><input type="radio" name="topic" value="ipcapassado"/>IPCA Passado</label>
                </li>
                <li>
                    <label><input type="radio" name="topic" value="ipcapassado"/>Boletim Focus</label>
                </li>
                <li>
                    <label><input type="radio" name="topic" value="medium"/>Medium</label>
                </li>
            </ul>
            <div><input type="text" value={this.state.highlight}  onChange={this.handleComplementChange} />Valor</div>
            <div><input type="text" value={this.state.url}  onChange={this.handleUrlChange} />Url</div>
        </div>

        <div>
            <input type="submit" value="Enviar"/>
        </div>
        </form>
      </div>
    );
  }
}

export default _PostCrud;
