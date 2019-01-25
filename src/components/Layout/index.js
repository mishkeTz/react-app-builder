import React from 'react';

import Wrapper from '../../hoc/Wrapper';
import Toolbar from '../Navigation/Toolbar';
import classes from './Layout.css';

const layout = (props) => (
    <Wrapper>
        <Toolbar />
        <main className={classes.Content}>
            {props.children}
        </main>
    </Wrapper>
);

export default layout;