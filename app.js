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
  res.render('index', {title: 'Conclave'});
});

app.get('/about', function (req, res) {
  res.render('about', {title: 'About'});
});

app.get('/bots', function(req, res) {
  res.render('bots', {title: 'Talk to Bots'});
});

app.get('/idLength', function (req, res) {
  res.render('idGraph');
});

app.get('/opTime', function (req, res) {
  res.render('timeGraph');
});

app.get('/arraysGraph', function (req, res) {
  res.render('arraysGraph');
});

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
