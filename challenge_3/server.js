const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');
const Sequelize = require('sequelize');

// set up logging and serving client file
app.use(express.static('public'));
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
    type: Sequelize.STRING
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
app.get('/newpurchase', (req, res) => {
  console.log('received get request to /newpurchase');
  Purchase.create({userId: null})
  .then((purchase) => {
    console.log('new purchase id: ', purchase.id);
    res.end();
  })
  .catch(err => {
    console.error('failed to create purchase', err);
    res.end();
  });
})

// listen for client requests
app.listen(port, () => console.log(`Listening on port ${port}`));
