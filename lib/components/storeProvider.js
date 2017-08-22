import React from 'react';
import PropTypes from 'prop-types';

const storeProvider = (Component) => {
  const WithStore = (props, context) =>
    <Component  { ...props } store={ context.store } />;

  WithStore.contextTypes = {
    store: PropTypes.object
  };
  return WithStore;
};

export default storeProvider;