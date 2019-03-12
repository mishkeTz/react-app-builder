import React from 'react';

import classes from './index.css';

import Logo from '../../Logo';
import NavigationItems from '../NavigationItems';
import BackDrop from '../../ui/Backdrop';
import Wrapper from '../../../hoc/Wrapper';

const sideDrawer = (props) => {

    let attachedClasses = [
        classes.SideDrawer,
        classes.Close
    ];

    if (props.open) {
        attachedClasses = [
            classes.SideDrawer,
            classes.Open
        ];
    }

    return (
        <Wrapper>
            <BackDrop 
                show={props.open}
                clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </Wrapper>
    );
};

export default sideDrawer;