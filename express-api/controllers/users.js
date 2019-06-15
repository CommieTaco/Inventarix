const Users = require('../models/users');
const bcrypt = require('bcrypt');


exports.auth = (req, res) => {
    if(!req.body.username || !req.body.password) {
        return res.status(400).send({
            message: "User can not be empty or bad request"
        });
    }
    Users.findOne({username:req.body.username, password:req.body.password})
    .then(users => {
        if(users)
            res.send(users)
        else
            res.status(404).send({
                message:"Not found"
            })
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

exports.create = (req, res) => {
    if(!req.body.username || !req.body.password || !req.body.name || !req.body.lastname) {
        return res.status(400).send({
            message: "User can not be empty or bad request"
        });
    }
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        const user = new Users({
            username: req.body.username, 
            password: hash,
            name: req.body.name,
            lastname: req.body.lastname
        });
    
        user.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the User."
            });
        });
    });
};

exports.findAll = (req, res) => {
    Users.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

exports.findOne = (req, res) => {
    Users.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    });
};

exports.update = (req, res) => {
    if(!req.body.username || !req.body.password || !req.body.name || !req.body.lastname) {
        return res.status(400).send({
            message: "User can not be empty or bad request"
        });
    }

    Users.findByIdAndUpdate(req.params.userId, {
        username: req.body.username, 
        password: req.body.password,
        name: req.body.name,
        lastname: req.body.lastname
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.userId
        });
    });
};

exports.delete = (req, res) => {
    Users.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
};