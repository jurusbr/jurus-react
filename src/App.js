import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import Timeline from "./components/timeline/Timeline";
import PostCrud from "./components/_crud/_PostCrud"
import Category from "./components/categories/Category"
import Bonds from "./components/bonds/Bonds"
import Bond from "./components/bonds/Bond"
import Index from "./components/index/Index"
import BondPage from "./components/bond/BondPage"
import NavBar from "./components/navbar/NavBar";
import Api from './Api';

class App extends Component {

  componentWillMount() {
    this.setState({
      quickViewers: [],
      posts: []
    });
    
    this._loadData();
  }

  _loadData(){
    let api = new Api();

    api.loadPosts((posts) => {
      this.setState({
        posts: posts
      });
    });

    /*api.loadQuickViews((quicks) => {
      this.setState({
        quickViewers: quicks
      });
    });*/
  }

  render() {


    return (
      <div className="center">
        <NavBar />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Timeline
                posts={this.state.posts} quickViewers={this.state.quickViewers}
              />
            )}
          />
          <Route
            exact
            path="/crud"
            render={() => (
              <PostCrud />
            )}
          />
          <Route
            exact
            path="/categories"
            render={() => (
              <Category />
            )}
          />
          <Route
            exact
            path="/bonds"
            render={() => (
              <BondPage />
            )}
          />
          <Route
            exact
            path="/bond/:bond"
            component={Bond}
          />
          <Route
            exact
            path="/bonds/:category"
            component={Bonds}
          />
          <Route
            exact
            path="/index"
            render={() => (
              <Index />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
