import React from 'react';
import ReactDOM from 'react-dom';
const axios = require('axios');

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkoutStage: 0,
      purchaseId: 0,
      userId: null
    }
    this.handleClick = this.handleClick.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  render () {
    // index / checkout
    if (this.state.checkoutStage === 0) {
      return (
        <div>
          <button id="checkout-button" onClick={this.handleClick}>Checkout</button>
        </div>
      )
    }
    // form 1
    if (this.state.checkoutStage === 1) {
      return (
        <div>
          <form id="form-1">
            <div>
              <label>Name:</label>
              <input id="name" type="text"/>
            </div>
            <div>
              <label>Email:</label>
              <input id="email" type="email"/>
            </div>
            <div>
              <label>Password:</label>
              <input id="password" type="password"/>
            </div>
            <button id="next-button-1" onClick={this.handleClick}>Next</button>
          </form>
        </div>
      )
    }
    // form 2
    if (this.state.checkoutStage === 2) {
      return (
        <div>
          <form id="form-2">
            <div>
              <label>Address line 1:</label>
              <input id="line1" type="text"/>
            </div>
            <div>
              <label>Address line 2:</label>
              <input id="line2" type="text"/>
            </div>
            <div>
              <label>Address city:</label>
              <input id="city" type="text"/>
            </div>
            <div>
              <label>Address state:</label>
              <input id="state" type="text"/>
            </div>
            <div>
              <label>Address zipcode:</label>
              <input id="zip" type="text"/>
            </div>
            <div>
              <label>Address phone:</label>
              <input id="phone" type="tel"/>
            </div>
            <button id="next-button-2" onClick={this.handleClick}>Next</button>
          </form>
        </div>
      )
    }
    // form 3
    if (this.state.checkoutStage === 3) {
      return (
        <div>
          <form id="form-3">
            <div>
              <label>Credit card number:</label>
              <input id="cc-number" type="number"/>
            </div>
            <div>
              <label>Expiry date:</label>
              <input id="expiry-date" type="date"/>
            </div>
            <div>
              <label>CVV:</label>
              <input id="cvv" type="number"/>
            </div>
            <div>
              <label>Billing zipcode:</label>
              <input id="billing-zip" type="text"/>
            </div>
            <button id="next-button-3" onClick={this.handleClick}>Next</button>
          </form>
        </div>
      )
    }
  }

  // when called without arguments, resets state to checkout stage
  updateState(checkoutStage = 0, purchaseId = null, userId = null) {
    this.setState({
      checkoutStage: checkoutStage,
      purchaseId: purchaseId,
      userId: userId
    });
  }

  handleClick(e) {
    e.preventDefault();
    if (this.state.checkoutStage === 0) {
      axios.get('/newpurchase')
      .then((res) => {
        console.log('request to /newpurchase successful, purchaseId:', res.data.purchaseId);
        this.updateState(this.state.checkoutStage + 1, res.data.purchaseId);
      })
      .catch((err) => {
        console.log('request to /newpurchase failed:', err);
        this.updateState(); // reset
      });
    } else if (this.state.checkoutStage === 1) {
      axios.post('/newuser', {
        purchaseId: this.state.purchaseId,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
      })
      .then((res) => {
        console.log('request to /newuser successful, userId: ', res.data.userId);
        this.updateState(this.state.checkoutStage + 1, this.state.purchaseId, res.data.userId);
      })
      .catch((err) => {
        console.log('request to /newuser failed:', err);
        this.updateState(); // reset
      });
    } else if (this.state.checkoutStage === 2) {
      axios.post('/newaddress', {
        purchaseId: this.state.purchaseId,
        userId: this.state.userId,
        line1: document.getElementById('line1').value,
        line2: document.getElementById('line2').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zip: document.getElementById('zip').value,
        phone: document.getElementById('phone').value
      })
      .then((res) => {
        console.log('request to /newaddress successful, addressId: ', res.data.addressId);
        this.updateState(this.state.checkoutStage + 1, this.state.purchaseId, this.state.userId);
      })
      .catch((err) => {
        console.log('request to /newaddress failed:', err);
        this.updateState(); // reset
      });
    } else if (this.state.checkoutStage === 3) {
      axios.post('/newpayment', {
        purchaseId: this.state.purchaseId,
        userId: this.state.userId,
        ccNumber: document.getElementById('cc-number').value,
        expiryDate: document.getElementById('expiry-date').value,
        cvv: document.getElementById('cvv').value,
        billingZip: document.getElementById('billing-zip').value
      })
      .then((res) => {
        console.log('request to /newpayment successful, paymentId: ', res.data.paymentId);
        this.updateState(); // reset
      })
      .catch((err) => {
        console.log('request to /newpayment failed:', err);
        this.updateState(); // reset
      });
    }
  }
};

ReactDOM.render(<Checkout />, document.getElementById('app'));
