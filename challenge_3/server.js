const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');

app.use(express.static('public'));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.end();
});

app.listen(port, () => console.log(`Listening on port ${port}`));
