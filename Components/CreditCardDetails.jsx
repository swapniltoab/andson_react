import React, { Component } from 'react';

class CreditCardDetails extends Component {

    render() {

        const { goToPage, handleCcDetailOnChange, ccDetailFormSubmit, ccDetailData } = this.props;

        return (
            <div>
                <h2>Credit Card Detail Page</h2>
                <form onSubmit={() => ccDetailFormSubmit(event)}>
                    <div>Name: <input type="text"
                        id="ccName"
                        name='cardname'
                        value={ccDetailData.cardname}
                        onChange={() => handleCcDetailOnChange(event)} />
                    </div>
                    <div>CC Details: <input type="text"
                        id="ccCardDetails"
                        name='cardnumber'
                        value={ccDetailData.cardnumber}
                        onChange={() => handleCcDetailOnChange(event)} />
                    </div>
                    <input type="submit" value="Next" />
                </form>
                <button type="button" onClick={() => goToPage('add-address')} >Back</button>
            </div>
        );

    }
}

export default CreditCardDetails;