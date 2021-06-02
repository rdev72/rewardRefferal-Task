const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan');
const app = express()

//middleWares
//bodyParser-input from postman body
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
//mongoose
mongoose.connect('mongodb://uhb763ivvnrz6qd1seld:9wuHTBlwWUbdDJetcOat@bgiao4zskf6icl1-mongodb.services.clever-cloud.com:27017/bgiao4zskf6icl1',{
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
});
const db =mongoose.connection;
db.once('open',()=>console.log('mongo connected'));
db.on('error',err=> console.log(err));
//morgan
app.use(morgan('dev'))



//Routes
app.get('/',(req,res)=>{res.send(`<h1>This is rewardRefferal Task website</h1>`)})
app.use('/main',require('./routes/main'))


const port = process.env.PORT || 3000
app.listen(port,console.log(`server is running at port: ${port}`))