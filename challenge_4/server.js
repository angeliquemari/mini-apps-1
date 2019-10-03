const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.end();
});

app.listen(port, () => {console.log(`Listening on port ${port}..`)});
