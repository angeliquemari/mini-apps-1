const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');
const Sequelize = require('sequelize');

// set up logging and serving client file
app.use(express.static('public'));
app.use(express.json());
app.use(morgan('dev'));

// set up db connection and tables
const db = new Sequelize('checkout', 'root', 'chatterbox', {dialect: 'mysql'});
const User = db.define('users', {
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
});
const Address = db.define('addresses', {
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  line1: {
    type: Sequelize.STRING
  },
  line2: {
    type: Sequelize.STRING,
    allowNull: true
  },
  city: {
    type: Sequelize.STRING
  },
  state: {
    type: Sequelize.STRING
  },
  zip: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  }
});
const Payment = db.define('payments', {
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  creditCardNumber: {
    type: Sequelize.INTEGER
  },
  expiryDate: {
    type: Sequelize.DATE
  },
  CVV: {
    type: Sequelize.INTEGER
  },
  billingZip: {
    type: Sequelize.STRING
  }
});
const Purchase = db.define('purchases', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: User,
      key: 'id'
    }
  },
  addressId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: Address,
      key: 'id'
    }
  },
  paymentId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: Payment,
      key: 'id'
    }
  }
});
db.sync();

// route handling
// create new purchase record
app.get('/newpurchase', (req, res) => {
  Purchase.create({userId: null})
  .then((purchase) => {
    res.send({purchaseId: purchase.id});
  })
  .catch((err) => {
    console.error('error creating purchase record: ', err);
    res.end();
  });
})

// create new user record, update purchase record with user ID
app.post('/newuser', (req, res) => {
  var userId;
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
  .then((user) => {
    userId = user.id;
    Purchase.update({userId: user.id}, {where: {id: req.body.purchaseId}});
  })
  .then(() => {
    res.send({userId: userId});
  })
  .catch((err) => {
    console.error('error creating user or updating purchase record: ', err);
    res.end();
  });
});

// create new address record, update purchase record with address ID
app.post('/newaddress', (req, res) => {
  var addressId;
  Address.create({
    userId: req.body.userId,
    line1: req.body.line1,
    line2: req.body.line2,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    phone: req.body.phone
  })
  .then((address) => {
    addressId = address.id;
    Purchase.update({addressId: address.id}, {where: {id: req.body.purchaseId}});
  })
  .then(() => {
    res.send({addressId: addressId});
  })
  .catch((err) => {
    console.error('error creating address or updating purchase record: ', err);
    res.end();
  });
});

// create new payment record, update purchase record with payment ID
app.post('/newpayment', (req, res) => {
  var paymentId;
  Payment.create({
    userId: req.body.userId,
    ccNumber: req.body.ccNumber,
    expiryDate: req.body.expiryDate,
    cvv: req.body.cvv,
    billingZip: req.body.billingZip
  })
  .then((payment) => {
    paymentId = payment.id;
    Purchase.update({paymentId: payment.id}, {where: {id: req.body.purchaseId}});
  })
  .then(() => {
    res.send({paymentId: paymentId});
  })
  .catch((err) => {
    console.error('error creating payment or updating purchase record: ', err);
    res.end();
  });
});

// listen for client requests
app.listen(port, () => console.log(`Listening on port ${port}`));
