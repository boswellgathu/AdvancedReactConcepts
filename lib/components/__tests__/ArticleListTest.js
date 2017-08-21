import React from 'react';
import renderer from 'react-test-renderer';

import ArticleList from '../ArticleList';

const testProps = {
  articles: {
    a: {id: 'a'},
    b: {id: 'b'}
  },
  store: {
    lookupAuthor: jest.fn(() => ({}))
  }
};

describe('ArticleList', () => {
  it('It renders correctly', () => {
    const tree =  renderer.create(
      <ArticleList 
        {...testProps}
      />
    ).toJSON();
    expect(tree.children.length).toBe(2);
    expect(tree).toMatchSnapshot();
  });
});