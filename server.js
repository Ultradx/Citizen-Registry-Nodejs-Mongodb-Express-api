// require("dotenv").config();
const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const indexRouter = require('./routes/index')
const citizenRouter = require('./routes/citizens')


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: true
}))


//---------------------------Mongoose----------------------------------
const mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017/', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
mongoose.Promise = global.Promise;
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))
//---------------------------End Mongoose-------------------------------

//---------------------------Mongoose----------------------------------
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://mongodb:27017/', {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
// });
// mongoose.Promise = global.Promise;
// const db = mongoose.connection
// db.on('error', error => console.error(error))
// db.once('open', () => console.log('Connected to Mongoose'))
//---------------------------End Mongoose-------------------------------


app.use('/', indexRouter)
app.use('/citizens', citizenRouter)


app.listen(3000)