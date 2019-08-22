const express = require('express');
//const aggregate = require('aggregate');
const router = express.Router();
const ImInterstedInUser = require('../models/IminterestedInUser.model.js');
const User = require('../models/user.model.js');
const Role = require('_helpers/role');
const db = require('config/db');

// Create and Save a new List
exports.create = (req, res) => {
	
	//Validate User Role who create Apartment Listing

	const currentUser = req.user;
    const id = parseInt(req.params.id);
    // only allow admins to access other user records
    if (id !== currentUser.sub && currentUser.role !== Role.User) {
        return res.status(401).json({ message: 'Unauthorized User' }); //401 Unauthorized
    }
	
  	
    // Create a List
    const AmInterstedInUser = new ImInterstedInUser({
	    questions: req.body.questions,
		user_id: req.user.sub
	});

	  // Save List in the database
	 
    AmInterstedInUser.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the List."
        })
    });
};



// Retrieve and return all lists from the database.
exports.findAll = (req, res) => {
	
	var current_user = req.user.sub;
	
	console.log('curent User Id' + current_user);
	
	 ImInterstedInUser.findOne({},  function(err, result) {
		 
		 console.log(result);
		res.send(result);
	 });
	
	// console.log(currentUser);
    // ImInterstedInUser.find()
    // .then(lists => {
        // res.send(lists);
    // }).catch(err => {
        // res.status(500).send({
            // message: err.message || "Apartment Not Found"
        // });
    // });
};




// Update a list identified by the listId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.questions) {
        return res.status(400).send({
            message: "User Questions  can not be empty"       // 400 Bad Request
        });
    }

    // Find list and update it with the request body
    ImInterstedInUser.findByIdAndUpdate(req.params.listId, {
                                  
									questions: req.body.questions
									
    }, {new: true})
    .then(lists => {
        if(!lists) {
            return res.status(404).send({
                message: "List not found with id " + req.params.listId
            });
        }
        res.send(lists);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "List not found with id " + req.params.listId
            });                
        }
        return res.status(500).send({
            message: "Error updating list with id " + req.params.listId
        });
    });
};