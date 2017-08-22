import React from 'react';
// import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import ArticleList from '../ArticleList';

const testProps = {
  articles: {
    a: {id: 'a'},
    b: {id: 'b'}
  }
};

describe('ArticleList', () => {
  it('It renders correctly', () => {
    const wrapper =  shallow(
      <ArticleList 
        {...testProps}
      />
    );

    //expect(wrapper.node.props.children.length).toBe(2);
    expect(wrapper.find('Article').length).toBe(2);
    expect(wrapper).toMatchSnapshot();
  });
});