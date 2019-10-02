const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
const morgan = require('morgan');
const multer  = require('multer')
const upload = multer();

app.use(express.static('client'));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.end();
});

var csv;
app.post('/', upload.single('file'), function (req, res) {
  var fileText = req.file.buffer.toString();
  csv = getCsv(JSON.parse(fileText));
  res.send(csv);
})

app.get('/download', function (req, res) {
  res.attachment().type('text/csv').send(csv);
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
