import React, { Component } from 'react';

class Thanks extends Component {

    render() {

        const { goToPage } = this.props;

        return (
            <div>
                <h2>Thank you success page</h2>
                <button type="button" onClick={() => goToPage('order-review')} >Back</button>
            </div>
        );

    }
}

export default Thanks;