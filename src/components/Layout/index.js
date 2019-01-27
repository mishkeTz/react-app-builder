import React, { Component } from 'react';

import Wrapper from '../../hoc/Wrapper';
import Toolbar from '../Navigation/Toolbar';
import classes from './Layout.css';
import SideDrawer from '../Navigation/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        });
    }

    drawerToggleClicked = () => {
        this.setState((prevState) => {
            return {
                showSideDrawer: !prevState.showSideDrawer
            }
        })
    }

    render() {
        return (
            <Wrapper>
                <Toolbar 
                    drawerToggleClicked={this.drawerToggleClicked} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Wrapper>
        );
    }
}

export default Layout;