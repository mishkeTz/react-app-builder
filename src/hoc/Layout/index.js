import React, { Component } from 'react';
import { connect } from 'react-redux';

import Wrapper from '../Wrapper';
import Toolbar from '../../components/Navigation/Toolbar';
import classes from './Layout.css';
import SideDrawer from '../../components/Navigation/SideDrawer';

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
                    drawerToggleClicked={this.drawerToggleClicked}
                    isAuth={this.props.isAuthenticated}/>
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                    isAuth={this.props.isAuthenticated}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Wrapper>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
    }
}

export default connect(mapStateToProps)(Layout);