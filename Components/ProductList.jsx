

import React, { Component } from 'react';

class ProductList extends Component {

  render() {

    const { products, goToPage, updateCart } = this.props;

    return (
      <div>
        <h2>Products</h2>
        <div className="product_row">{
          products.map((p, index) => {
            return (
              <div className="product-item" key={p.id}>
                <div><img src={p.imgUrl} className="prod_img" /></div>
                <div>{p.name}</div>
                <div>{p.currency} - {p.price}</div>
                <button type="button" onClick={() => updateCart(p.id, '')} >Add to cart</button>
              </div>
            );
          })
        }
        </div>
        <button type="button" onClick={() => goToPage('cart')} >Go to cart</button>
        <button type="button" onClick={() => goToPage('post-fetch')} >Post Fetch</button>
        <button type="button" onClick={() => goToPage('post-axios')} >Post Axios</button>
      </div>
    );

  }
}

export default ProductList;
