import React, { Component } from 'react';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary';
import ContactData from './ContactData';

import { Route, Redirect } from 'react-router-dom';

import * as actionCreators from '../../store/actions/index';

class Checkout extends Component {

    checkoutCancelledHandler = () => {  
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {

        let summary = <Redirect to='/'/>;

        console.log(this.props.ings);

        if (this.props.ings) {

            console.log("PURCHASED", this.props.purchased);

            const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null;

            summary = (<div>
                        {purchasedRedirect}
                        <CheckoutSummary 
                            ingredients={this.props.ings}
                            checkoutCancelled={this.checkoutCancelledHandler}
                            checkoutContinued={this.checkoutContinuedHandler} />;    
                        <Route 
                            path={this.props.match.path + '/contact-data'} 
                            component={ContactData} />
                    </div>
            );
        }

        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased,
    };
}

export default connect(mapStateToProps)(Checkout);