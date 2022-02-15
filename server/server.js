require("dotenv").config()
const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'build');

const port = process.env.PORT || 4000;

app.use(express.static(publicPath));
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('*', (req, res) => {
   res.sendFile(path.join(publicPath, 'index.html'));
});



app.listen(port, () => {
   console.log('Server is up!');
});