import React from 'react';

import classes from './index.css';
import burgerLogo from '../../assets/images/logo.png';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="Burger app"/>
    </div>
);

export default logo;
