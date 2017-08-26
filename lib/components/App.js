import React from 'react';
import PropTypes from 'prop-types';
import pickBy from 'lodash.pickby';

import ArticleList from './ArticleList';
import SearchBar from './SearchBar';
import TimeStamp from './TimeStamp';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = this.props.store.getState();
  }
  onStoreChange = () => {
    this.setState(this.props.store.getState());
  }

  componentDidMount () {
    this.subscriptionId = this.props.store.subscribe(this.onStoreChange);
    this.props.store.startClock();
  }
  
  componentWillUnmount () {
    this.props.store.unsubscribe(this.subscriptionId);
  }
  
  static childContextTypes = {
    store: PropTypes.object
  };

  getChildContext() {
    return {
      store: this.props.store
    };
  }

  render() {
    let { articles, searchTerm } = this.state;
    const searchRe = new RegExp(searchTerm, 'i');
    if(searchTerm) {
      articles = pickBy(articles, (value) => {
        return value.title.match(searchRe)
        || value.body.match(searchRe);
      });
    } 
    return (
      <div>
        <TimeStamp />
        <SearchBar />
        <ArticleList 
          articles={articles}    
        />
      </div>
    );
  }
}