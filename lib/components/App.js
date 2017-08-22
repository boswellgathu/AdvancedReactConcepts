import React from 'react';
import PropTypes from 'prop-types';

import ArticleList from './ArticleList';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = this.props.store.getState();
  }
  static childContextTypes = {
    store: PropTypes.object
  };
  getChildContext() {
    return {
      store: this.props.store
    };
  }

  render () {
    return (
      <ArticleList 
        articles={this.state.articles}
        store = { this.props.store }        
      />
    );
  }
}