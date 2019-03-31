const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
let listener;

const bodyParser = require('body-parser');

const testResults = require('./lib/resources/testResults');

app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', function (req, res) {
  // res.writeHead(302, {
  //   'Location': '/doc'
  // });
  // res.end();
  res.render('index', {title: 'ClassPad'});
});

app.get('/doc', function (req, res) {
  res.render('doc', {title: 'ClassPad | Doc'});
});

// app.get('/about', function (req, res) {
//   res.render('about', {title: 'About'});
// });

app.use(express.json());
app.post('/mySQL', function (req, res) {
  console.log(req.body['text'])
  const results = new testResults.TestRun(req.body['text'])
  res.status(200).send(JSON.stringify({ result: results.pass, reflect: req.body['text'] }))
})

var srv = app.listen(port, function() {
	console.log('Listening on '+port)
})

app.use('/peerjs', require('peer').ExpressPeerServer(srv, {
	debug: true
}))
