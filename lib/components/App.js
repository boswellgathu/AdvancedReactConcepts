import React from 'react';
import PropTypes from 'prop-types';
import pickBy from 'lodash.pickby';
import Perf from 'react-addons-perf';

import ArticleList from './ArticleList';
import SearchBar from './SearchBar';
import TimeStamp from './TimeStamp';

if (typeof window !== 'undefined'){
  window.Perf = Perf;
}

export default class App extends React.PureComponent {
  constructor(props){
    super(props);
    this.state = this.appState();
  }
  onStoreChange = () => {
    this.setState(this.appState);
  }

  componentDidMount () {
    this.subscriptionId = this.props.store.subscribe(this.onStoreChange);
    this.props.store.startClock();
    setImmediate(() => {
      Perf.start();
    });

    setTimeout(() => {
      Perf.stop();
      Perf.printWasted();
    }, 5000);
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

  appState() {
    const { articles, searchTerm } = this.props.store.getState();
    return {articles, searchTerm };
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