import React, { Component } from 'react';

class OrderReview extends Component {

    render() {

        const { goToPage, shippingData, cardData, productData, itemQuantity } = this.props;

        return (
            <div>
                <h2>Order Review Page</h2>
                <div className="mainOrderOverviewContainer">
                    <div className="shippingOverviewContainer">
                        <h3>Shipping Details</h3>
                        <div className="shippingDetailsContainer">
                            <div className="info" >Name: {shippingData.name}</div>
                            <div className="info" >Address:{shippingData.address}</div>
                            <div className="info" >Shipping Date:{shippingData.date}</div>
                        </div>
                    </div>

                    <div className="cardOverviewContainer">
                        <h3>Card Details</h3>
                        <div className="cardDetailsContainer">
                            <div className="info" >Card Holder Name: {cardData.cardname}</div>
                            <div className="info" >Card Number:{cardData.cardnumber}</div>
                        </div>
                    </div>
                </div>
                <div className="productOverviewContainer">
                    <h3>Purchased Product</h3>
                    <div className="product_row">
                    {
                        productData.map((p, index) => {
                            return (
                                <div className="product-item" key={p.id}>
                                    <div><img src={p.imgUrl} className="prod_img" /></div>
                                    <div>{p.name}</div>
                                    <div>{p.currency} - {p.price}</div>
                                    <div>Quantity: {itemQuantity(p.id)}</div>
                                </div>
                            );
                        })
                    }
                    </div>
                </div>
                <button type="button" onClick={() => goToPage('add-ccdetails')} >Back</button>
                <button type="button" onClick={() => goToPage('thank-you-sucess')} >Next</button>
            </div>
        );

    }
}

export default OrderReview;