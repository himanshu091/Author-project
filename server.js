if(process.env.NODE_ENV !== 'production'){

    require('dotenv').config();
}


const express = require('express');
const app = express();
const expresslayouts = require('express-ejs-layouts');

const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true,useUnifiedTopology: true})

const db = mongoose.connection;
db.on('error',error =>{
    console.log(error);
})
db.once('open',() =>{
    console.log('Connected to mongoose');
})

app.set('view engine','ejs');
app.set('views',__dirname + '/views');
app.set('layout','layouts/layout');
app.use(expresslayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({limit :'10mb',extended: false }));
app.use('/',indexRouter);
app.use('/authors',authorRouter);     
app.listen(process.env.PORT || 3000);
