import React, { Component } from 'react';

import Wrapper from '../../hoc/Wrapper';
import Burger from '../../components/Burger';

export default class BurgerBuilder extends Component {
  render() {
    return (
      <Wrapper>
          <Burger />
          <div>Build Controls</div>
      </Wrapper>
    )
  }
}
