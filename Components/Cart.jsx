import React, { Component } from 'react';

class Cart extends Component {

  render() {

    const { cartItems, cartTotal, itemQuantity, goToPage, updateProductQuantity, removeProductFromCart, itemPriceTotal } = this.props;
    let cartContent = '';

    if (cartItems.length > 0) {
      cartContent = cartItems.map((p, index) => {
        return (
          <tr className="" key={p.id}>
            <td><button
              type="button"
              onClick={() => removeProductFromCart(p.id)}
            >
              Remove Product
            </button>
            </td>
            <td><img src={p.imgUrl} className="prod_img" /></td>
            <td>{p.name}</td>
            <td><button
              type="button"
              onClick={() => updateProductQuantity(p.id, 'substract')} >
              -1
              </button>
              {itemQuantity(p.id)}
              <button
                type="button"
                onClick={() => updateProductQuantity(p.id, 'add')}
              >
                +1
              </button>
            </td>
            <td>{p.currency}{p.price}</td>
            <td>{itemPriceTotal(p.id)}</td>
          </tr>
        );
      })
    } else {
      cartContent = <h4>Your Cart is Empty</h4>;
    }

    return (
      <div>
        <h2>Cart Page</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>Image</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
            {cartContent}
          </tbody>
        </table>
        <div className="cartTotal">
          Cart Total: ${cartTotal}
        </div>
        <button type="button" onClick={() => goToPage('product-list')} >Back</button>
        <button type="button" onClick={() => goToPage('add-address')} >Next</button>
      </div>
    );

  }
}

export default Cart;