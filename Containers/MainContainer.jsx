import React, { Component } from 'react';
import axios from 'axios';
import ProductList from '../Components/ProductList';
import Cart from '../Components/Cart';
import Shippingaddress from '../Components/Shippingaddress';
import CreditCardDetails from '../Components/CreditCardDetails';
import OrderReview from '../Components/OrderReview';
import Thanks from '../Components/Thanks';
import PostFetch from '../Components/PostFetch';
import PostAxios from '../Components/PostAxios';

import Home from '../Components/Home';
import About from '../Components/About';
import Users from '../Components/Users';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


/**
 * IMP docs
 * https://webapplog.com/es6/
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
 */
const PRODUCTS = [
  { id: 1, name: 'Choco 1', price: 10, currency: '$', imgUrl: '../images/choco1.jpg', cartQuantity: 0 },
  { id: 2, name: 'Choco 2', price: 20, currency: '$', imgUrl: '../images/choco2.jpeg', cartQuantity: 0 },
  { id: 3, name: 'Choco 3', price: 30, currency: '$', imgUrl: '../images/choco3.jpg', cartQuantity: 0 },
  { id: 4, name: 'Choco 4', price: 40, currency: '$', imgUrl: '../images/choco4.jpg', cartQuantity: 0 },
  { id: 5, name: 'Choco 5', price: 50, currency: '$', imgUrl: '../images/choco5.jpg', cartQuantity: 0 }
];

const FetchApiUrl = 'http://duconair.oablab.com/wp-json/wp/v2/pages';
const AxiosApiUrl = 'https://crypco.com/wp-json/wp/v2/pages';
const proxyurl = "https://cors-anywhere.herokuapp.com/";

class MainContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fetchPosts: [],
      axiosPosts: [],
      isLoading: true,
      products: PRODUCTS,
      cart: {
        items: [],
        total: 0,
      },
      shippingAdress: {
        name: '',
        address: '',
        date: ''
      },
      ccDetails: {
        cardname: '',
        cardnumber: ''
      },
      shippingDate: {},
      currentPage: 'product-list', // 'cart', 'add-address' 'add-ccdetails' 'order-review'  'thank-you-sucess'
      startDate: moment()
    };

    this.handleGoToPage = this.handleGoToPage.bind(this);
    this.handleUpdateCart = this.handleUpdateCart.bind(this);
    this.handleItemQuantity = this.handleItemQuantity.bind(this);
    this.handleItemPriceTotal = this.handleItemPriceTotal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleShippingDataChange = this.handleShippingDataChange.bind(this);
    this.handleCcDetailDataChange = this.handleCcDetailDataChange.bind(this);
    this.handleCcDetailFormSubmit = this.handleCcDetailFormSubmit.bind(this);
    this.handleShippingDataFormSubmit = this.handleShippingDataFormSubmit.bind(this);
    this.handleRemoveProductFromCart = this.handleRemoveProductFromCart.bind(this);
  }

  componentDidMount() {
    this.fetchPosts();
    this.axiosPosts();
  }

  fetchPosts() {
    fetch(FetchApiUrl)
      .then(response => response.json())
      .then(
        data =>
          this.setState({
            fetchPosts: data,
            isLoading: false,
          })
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }

  axiosPosts() {

    axios.get(proxyurl + AxiosApiUrl)
    .then(result => this.setState({
      axiosPosts: result.data,
      isLoading: false
    }))
    .catch(error => this.setState({
      isLoading: false
    }));

  }

  handleGoToPage(pageName) {
    this.setState({
      currentPage: pageName
    });
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });

    let ShippingData = this.state.shippingAdress;
    ShippingData.date = this.state.startDate.format('YYYY-MM-DD');

    this.setState({
      shippingAdress: ShippingData
    });
  }

  handleUpdateCart(productId, action) {
    let cart = this.state.cart;
    let cartTotal = this.state.cart.total;
    let product = this.state.products.find(p => p.id == productId);

    if (action !== '') {
      switch (action) {
        case 'add':
          if (!cart.items.find(p => p.id == productId)) {
            cart.items.push(product);
          }
          product.cartQuantity = (product.cartQuantity + 1);
          cartTotal = product.price + cartTotal;
          cart.total = cartTotal;
          break;

        case 'substract':
          if (product.cartQuantity !== 0) {
            if (!cart.items.find(p => p.id == productId)) {
              cart.items.pop(product);
            }
            product.cartQuantity = (product.cartQuantity - 1);
            cartTotal = cartTotal - product.price;
            cart.total = cartTotal;
          }

          break;
      }
    } else {
      if (!cart.items.find(p => p.id == productId)) {
        cart.items.push(product);
      }
      product.cartQuantity = (product.cartQuantity + 1);
      cartTotal = product.price + cartTotal;
      cart.total = cartTotal;
    }

    this.setState({
      cart: cart
    });
  }

  handleItemQuantity(productId) {
    let itemCount = 0;
    let product = this.state.cart.items.find(p => p.id == productId);
    itemCount = product.cartQuantity;
    return itemCount;
  }

  handleItemPriceTotal(productId) {
    let itemPriceTotal = 0;
    let product = this.state.cart.items.find(p => p.id == productId);
    itemPriceTotal = product.price * product.cartQuantity;
    return itemPriceTotal;
  }

  handleShippingDataChange(event) {
    let ShippingData = this.state.shippingAdress;
    let name = event.target.name;
    ShippingData[name] = event.target.value;
    this.setState({
      shippingAdress: ShippingData
    });
  }

  handleShippingDataFormSubmit(event) {
    event.preventDefault();
    if (this.state.shippingAdress.name == '' || this.state.shippingAdress.address == '') {
      alert('Please fill the details');
      return false;
    }
    let ShippingData = this.state.shippingAdress;
    ShippingData.date = this.state.startDate.format('YYYY-MM-DD');
    this.setState({
      currentPage: 'add-ccdetails',
      shippingAdress: ShippingData
    });
  }

  handleCcDetailDataChange(event) {
    let CcData = this.state.ccDetails;
    let name = event.target.name;
    CcData[name] = event.target.value;
    this.setState({
      ccDetails: CcData
    });
  }

  handleCcDetailFormSubmit(event) {
    event.preventDefault();
    if (this.state.ccDetails.cardname == '' || this.state.ccDetails.cardnumber == '') {
      alert('Please fill the details');
      return false;
    }
    if (name = 'cardnumber' && isNaN(this.state.ccDetails.cardnumber)) {
      alert('Card number must be integer only');
      return false;
    }
    this.setState({
      currentPage: 'order-review'
    });
  }

  handleRemoveProductFromCart(productId) {
    let cart = this.state.cart;
    let cartTotal = this.state.cart.total;
    let product = this.state.products.find(p => p.id == productId);
    if (cart.items.find(p => p.id == productId)) {
      let findProduct = cart.items.indexOf(product);
      cart.items.splice(findProduct, 1)
    }
    let productTotal = product.price * product.cartQuantity;
    cartTotal = cartTotal - productTotal;
    cart.total = cartTotal;
    this.setState({
      cart: cart
    });
  }

  render() {

    let showCompoent = null;
    let currentPage = this.state.currentPage;

    switch (currentPage) {

      case 'product-list':
        showCompoent = <ProductList
          products={this.state.products}
          goToPage={this.handleGoToPage}
          updateCart={this.handleUpdateCart} />;
        break;

      case 'cart':
        showCompoent = <Cart
          cartItems={this.state.cart.items}
          cartTotal={this.state.cart.total}
          itemQuantity={this.handleItemQuantity}
          itemPriceTotal={this.handleItemPriceTotal}
          goToPage={this.handleGoToPage}
          updateProductQuantity={this.handleUpdateCart}
          removeProductFromCart={this.handleRemoveProductFromCart} />;
        break;

      case 'add-address':
        showCompoent = <Shippingaddress
          datePickerComponent={<DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange} />}
          goToPage={this.handleGoToPage}
          handleOnChange={this.handleShippingDataChange}
          shippingDataFormSubmit={this.handleShippingDataFormSubmit}
          shippingData={this.state.shippingAdress} />;
        break;

      case 'add-ccdetails':
        showCompoent = <CreditCardDetails
          goToPage={this.handleGoToPage}
          handleCcDetailOnChange={this.handleCcDetailDataChange}
          ccDetailFormSubmit={this.handleCcDetailFormSubmit}
          ccDetailData={this.state.ccDetails} />;
        break;

      case 'order-review':
        showCompoent = <OrderReview
          goToPage={this.handleGoToPage}
          shippingData={this.state.shippingAdress}
          cardData={this.state.ccDetails}
          productData={this.state.cart.items}
          itemQuantity={this.handleItemQuantity} />;
        break;

      case 'thank-you-sucess':
        showCompoent = <Thanks
          goToPage={this.handleGoToPage} />;
        break;

      case 'post-fetch':
        showCompoent = <PostFetch
          posts={this.state.fetchPosts}
          goToPage={this.handleGoToPage} />;
        break;

      case 'post-axios':
        showCompoent = <PostAxios
          posts={this.state.axiosPosts}
          goToPage={this.handleGoToPage} />;
        break;

      default:
        showCompoent = <div>somthing went wrong, check currentPage in state <pre>{JSON.stringify(this.state)}</pre></div>
    }

    return (
      <div>
        {/* <pre>{JSON.stringify(this.state.cart)}</pre> */}
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about/">About</Link>
                </li>
                <li>
                  <Link to="/users/">Users</Link>
                </li>
              </ul>
            </nav>

            <Route path="/" exact component={Home} />
            <Route path="/about/" component={About} />
            <Route path="/users/" component={Users} />
          </div>
        </Router>
        {showCompoent}
      </div>
    );

  }
}

export default MainContainer;
