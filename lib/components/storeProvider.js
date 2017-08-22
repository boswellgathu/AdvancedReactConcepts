import React from 'react';
import PropTypes from 'prop-types';

const storeProvider = (Component) => {
  const WithStore = (props, context) =>
    <Component  { ...props } store={ context.store } />;

  WithStore.contextTypes = {
    store: PropTypes.object
  };
  // Maintaining the name of component being rendered

  WithStore.displayName = `${Component.name}Container`;
  return WithStore;
};

export default storeProvider;