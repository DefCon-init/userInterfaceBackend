const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = express.Router();
const userRoutes = require('./routes/user')
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

userRouter.route('/getAll').get(function(req, res) {
    userRoutes.getAll(req, res, (error, response) => {
        if (error) {
            res.status(400).json(error);
        } else {
            res.status(200).json(response);
        }
    })
});

userRouter.route('/getUser/:id').get(function(req, res) {
    userRoutes.getById(req, res, (error, response) => {
        if (error) {
            res.status(400).json(error);
        } else {
            res.status(200).json(response);
        }
    })
});

userRouter.route('/addUser').post(function(req, res) {
    userRoutes.addUser(req, res, (error, response) => {
        if (error) {
            res.status(400).json(error);
        } else {
            res.status(200).json(response);
        }
    })
});

userRouter.route('/updateUser').put(function(req, res) {
    userRoutes.updateUser(req, res, (error, response) => {
        if (error) {
            res.status(400).json(error);
        } else {
            res.status(200).json(response);
        }
    })
});

userRouter.route('/deleteUser').delete(function(req, res) {
    userRoutes.deleteUser(req, res, (error, response) => {
        if (error) {
            res.status(400).json(error);
        } else {
            res.status(200).json(response);
        }
    })
});

app.use('/users', userRouter);

mongoose
  .connect(
    `mongodb+srv://gallery:2vxJMtu7y2U8kd3J@cluster0-kkm3j.mongodb.net/user?retryWrites=true`,
    { useNewUrlParser: true }
  )
  .then(() => {
    const connection = mongoose.connection;

    connection.once('open', function() {
        console.log("MongoDB database connection established successfully");
    })    
    app.listen(PORT);
    console.log(`App listen to port ${PORT}`);
  })
  .catch(err => {
    console.log(err);
  });