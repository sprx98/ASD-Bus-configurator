const express = require('express');
const cors = require('cors');
const path = require('path');

const PORT = 5000;
const app = express();

app.use(express.static(__dirname + '/client'));
app.use('/build/', express.static(path.join(__dirname, 'node_modules/three/build')));
app.use('/jsm/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')));
app.use('/src/', express.static(path.join(__dirname, 'node_modules/three/src')));


app.get('/', cors(), function(req,res){
    res.sendFile(path.join(__dirname + '/client/index.html'));
});

app.listen(PORT, () =>{
    console.log(`Server is running on port: ${PORT} , ${__dirname}`);
});

