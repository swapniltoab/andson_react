import React, { Component } from 'react';

class Shippingaddress extends Component {

    render() {

        const { datePickerComponent, goToPage, handleOnChange, shippingDataFormSubmit, shippingData } = this.props;

        return (
            <div>
                <h2>Shipping Address Page</h2>
                <form onSubmit={() => shippingDataFormSubmit(event)}>
                    <div>Name: <input type="text"
                        className="shipName"
                        name='name'
                        value={shippingData.name}
                        onChange={() => handleOnChange(event)} />
                    </div>
                    <div>Address: <input type="text"
                        className="shipAddress"
                        name='address'
                        value={shippingData.address}
                        onChange={() => handleOnChange(event)} />
                    </div>
                    <div>Shipping Date: {datePickerComponent}</div>
                    <input type="submit" value="Next" />
                    {/* <button type="button" onClick={() => goToPage('add-ccdetails')} >Next</button> */}
                </form>
                <button type="button" onClick={() => goToPage('cart')} >Back to Cart</button>
            </div>
        );

    }
}

export default Shippingaddress;