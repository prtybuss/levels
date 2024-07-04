const express = require('express')
const path = require('path')
const app = express()
const port = 8080

app.use(express.static(__dirname + '/static'));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'static/level0.html'))
});

app.listen(port, () => {
	console.log('Listening on port: ' + port)
});