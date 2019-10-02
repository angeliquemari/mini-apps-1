import React from 'react';
import ReactDOM from 'react-dom';
const axios = require('axios');

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 0
    }
    this.handleClick = this.handleClick.bind(this);
  }

  render () {
    return (
    <div>
      <button id="checkout-button" onClick={this.handleClick}>Checkout</button>
    </div>
    )
  }

  handleClick(e) {
    axios.get('/newpurchase')
    .then((res) => {
      console.log('get request successful:', res);
    })
    .catch((err) => {
      console.log('get request failed:', err);
    });

  }
  // if checkout i.e. step 0
  // create new record in purchases table
  // set this.state.purchaseId

  // if form 1 i.e. step 1
  // create new record in users table
  // update record in purchases table
  // set this.state.userId

  // if form 2 i.e. step 2
  // create new record in addresses table
  // update record in purchases table

  // if form 3 i.e. step 3
  // create new record in payments table
  // update record in purchases table
  // reset to index page

  // outstanding Qs - separate click handlers and forms for each stage?
};

ReactDOM.render(<Checkout />, document.getElementById('app'));
