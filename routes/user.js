const User = require("../models/user");

module.exports = {
    getAll: (req, res, cb) => {
        let response = {
            success: false,
            message: ''
        }
        User.find((err, users) => {
            if (!!err) {
                response.error = err
                cb(response, null);
            } else {
                response.message = 'Data fetched'
                response.success = true
                response.data = users
                cb(null, response);
            }
        });
    },
    getById: (req, res, cb) => {
        let response = {
            success: false,
            message: ''
        }
        User.findById(req.params.id, (err, user) => {
            if (!!err) {
                response.error = err
                cb(response, null);
            } else {
                response.message = 'User fetched'
                response.success = true
                response.data = user
                cb(null, response);
            }
        });
    },
    addUser: (req, res, cb) => {
        let user = new User(req.body);
        user
            .save()
            .then(user => {
                const response = {
                    success: true,
                    message: "User added successfully",
                    data: user
                };
                cb(null, response);
            })
            .catch(err => {
                const error = {
                    success: false,
                    err,
                    message: "Failed while adding user"
                };
                cb(error, null);
            });
    },
    updateUser: (req, res, cb) => {
        User.findById(req.body.id, (err, user) => {
            if (!user) {
                cb({ success: false, message: "Data not found" }, null);
            } else {
                Object.keys(req.body).map(keyName => user[keyName] = (!!req.body[keyName]) ? req.body[keyName] : user[keyName])
                user
                    .save()
                    .then(user => {
                        cb(null, { success: true, message: "Updated success", data: user });
                    })
                    .catch(err => {
                        cb({ success: false, message: "Error while updating data", error: err }, null);
                    });
            }
        });
    },
    deleteUser: (req, res, cb) => {
        console.log(req.body.id)
        User.findByIdAndDelete(req.body.id, (err, user) => {
            console.log(err,  user)
            if (!user) {
                cb({ success: false, message: "Error while removing user" }, null);
            } else {
                cb(null, { success: true, message: "User successfully deleted", user });
            }
        });
    }
};
