var fs = require('fs')
const http = require('http')
const express = require('express')
var bodyParser = require('body-parser')
var xmlreader = require('xml2js')

var parser = new xmlreader.Parser();

const app = express()
const port = 3000
var exec = require('child_process').exec;

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use(express.json());
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.get('/:uniquecode', (req, res) => {
	const uniqueCode = req.params.uniquecode;
	fs.appendFile('log.txt', uniqueCode + '\n', (err) => {
		if (err) throw err;
		console.log('Logged: ${uniqueCode}');
	});
	res.sendFile(__dirname + '/views/index.html')
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.post('/login', (req, res) => {
  const { uniqueCode, id } = req.body;
  // Log the unique code and ID to login.txt
  fs.appendFile('login.txt', `${uniqueCode},${id}\n`, (err) => {
    if (err) throw err;
    console.log(`Logged: ${uniqueCode},${id}`);
  });
  // Send a success response back to the client
  res.status(200).send('Login successful');
});