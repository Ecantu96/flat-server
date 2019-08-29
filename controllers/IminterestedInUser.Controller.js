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
	  user_id = req.user.sub;


	ImInterstedInUser.find({user_id},  function(err, result) {

		 if (result != ""){

             ImInterstedInUser.update({}, {

									questions: req.body.questions

			}, {new: true})
			.then(lists => {
				if(!lists) {
					return res.status(404).send({
						message: "List not found"
					});
				}
				res.send({message: "Update Successfully"});
			})
         }else{
				AmInterstedInUser.save()
				.then(data => {
					res.send(data);
				}).catch(err => {
					res.status(500).send({
						message: err.message || "Some error occurred while creating the List."
					})
				});

		 }


	});




};

exports.findAll = (req, res) => {
	  var user_id = req.user.sub;
		const currentUser = req.user;
		const id = parseInt(req.params.id);

			ImInterstedInUser.findOne({user_id})
			.then(lists => {
				res.send(lists);
			}).catch(err => {
				res.status(500).send({
					message: err.message || "Apartment Not Found"
				});
			});

};
// Retrieve and return all lists from the database.
exports.findInterstedInUser = (req, res) => {

	var user_id = req.user.sub;

	ImInterstedInUser.findOne({user_id}, {'questions.typeofperson': true, 'questions.DoYouDrink': true, 'questions.DoYouSmoke': true, 'questions.LikeGoOut': true, 'questions.Workhours': true, 'questions.BedTime': true, 'questions.RelationshipStatus': true},  function(err, result) {


		var rules = [ { 'questions.typeofperson': result.questions.typeofperson }, { 'questions.DoYouDrink': result.questions.DoYouDrink }, { 'questions.DoYouSmoke': result.questions.DoYouSmoke }, { 'questions.LikeGoOut': result.questions.LikeGoOut }, { 'questions.Workhours': result.questions.Workhours }, { 'questions.BedTime': result.questions.BedTime }, { 'questions.RelationshipStatus': result.questions.RelationshipStatus }  ];

		User.aggregate(
		  [
		    { $match : {$and: rules }  }
		  ], function (err, result) {
				if (err) {
				   res.status(400).send({
					message: err.message || "Some error occurred while retrieving Matching User List."
				});
			}
		  res.status(200).send(result);
		});
	});
};
