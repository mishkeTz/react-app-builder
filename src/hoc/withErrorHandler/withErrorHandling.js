import React, { Component } from 'react';

import Modal from '../../components/ui/Modal';
import Wrapper from '../Wrapper';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        }

        componentWillMount () {

            this.reqInterceptor = axios
                .interceptors.request.use(request => {
                    this.setState({
                        error: null
                    });

                    return request;
                });

            this.resInterceptor = axios
                .interceptors.response.use(res => res, error => {
                    this.setState({
                        error: error
                    });
                });
        }

        componentWillUnmount () {
            axios
                .interceptors.request.eject(this.reqInterceptor);
            axios
                .interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({
                error: null
            });
        }

        render() {
            return (
                <Wrapper>
                    <Modal show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Wrapper>
            );  
        }
    }
}

export default withErrorHandler;