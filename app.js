// const express = require('express');
// const app = express();
// const morgan = require('morgan');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');

// const path = require('path');
// app.set('views', __dirname + '/views')
// app.set('view engine', 'ejs');

// const citizenRoutes = require('./routes/citizens');


// mongoose.connect('mongodb+srv://Aldo:' + process.env.MONGO_ATLAS_PW + '@cluster0.35kk7.mongodb.net/Cluster0?retryWrites=true&w=majority');
// mongoose.Promise = global.Promise;

// app.use(morgan('dev'));
// app.use(bodyParser.urlencoded({
//     extended: false
// }));
// app.use(bodyParser.json());

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE. GET');
//         return res.status(200).json({});
//     }
//     next();
// });

// app.use('/citizens', citizenRoutes);

// app.use((req, res, next) => {
//     const error = new Error("Not Found");
//     error.status = 404;
//     next(error);
// });

// app.use((error, req, res, next) => {
//     res.status(error.status || 500);
//     res.json({
//         error: {
//             message: error.message
//         }
//     })
// });

// app.listen(3005, () => {
//     console.log("Server running on port 3005");
// });

// module.exports = app;