const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('client'));
app.use(express.urlencoded())
// app.use(express.json());

app.get('/', (req, res) => {
  res.end();
});

app.post('/', function (req, res) {
  console.log('req json: ', req.body.data);
  var csv = getCsv(JSON.parse(req.body.data));
  console.log('res csv: ', csv);
  res.type('text/csv').send(csv);
})

app.listen(port, () => { console.log(`listening on port ${port}`) });

var getCsv = function(parsedData) {
  var columns = [];
  var keys = Object.keys(parsedData);
  for (var key in keys) {
      if (keys[key] !== 'children') {
          columns.push(keys[key]);
      }
  }
  var csvStr = columns.join(',') + '\n';
  var helper = function(parsedData) {
      for (var i = 0; i < columns.length; i++) {
          csvStr += parsedData[columns[i]] || '';
          if (i === columns.length - 1) {
              csvStr += '\n';
          } else {
              csvStr += ',';
          }
      }
      var children = parsedData['children'];
      for (var j = 0; j < children.length; j++) {
          helper(children[j]);
      }
  }
  helper(parsedData);
  return csvStr;
}
