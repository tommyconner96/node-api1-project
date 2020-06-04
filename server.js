//imports
const express = require("express")
const db = require("./database.js")
const cors = require("cors")
//express
const server = express()

//installing middleware
server.use(express.json())
server.use(cors())

//posts a new user
server.post("/api/users", (req, res) => {
		//validation to make sure theres a name and bio for the user
		if (!req.body.name || !req.body.bio) {
			return res.status(400).json({
				errorMessage: "Please provide name and bio for the user",
			})
		}

		//new user
		const newUser = db.createUser({
			name: req.body.name,
			bio: req.body.bio,
		})
		//returns 201 and returns new user
		res.status(201).json(newUser)
			//validates to make sure there is not an error saving the user
			.catch(err => {
				res.status(500).json({
					errorMessage: "There was an error while saving the user to the database"
				})
			})
	}),
	//returns an array of users
	server.get("/api/users", (req, res) => {
		const users = db.getUsers()
		users
		res.status(200).json(users)
			.catch(err => {
				res.status(500).json({
					errorMessage: "The users information could not be retrieved."
				})
			})
	}),

	//gets user by id
	server.get("/api/users/:id", (req, res) => {
		try {
			//validation to make sure the user exists
			if (user) {
				res.json(user)
			} else {
				res.status(404).json({
					message: "The user with the specified ID does not exist.",
				})
			}
			//catch to throw a 500 error if the info couldnt be recieved for another reason
		} catch (error) {
			res.status(500).json({
				errorMessage: "The user information could not be retrieved."
			})
		}
	}),

	//delete user by id
	server.delete("/api/users/:id", (req, res) => {
		const user = db.getUserById(req.params.id)
		try {
			if (user) {
				//delets user with specified id
				db.deleteUser(user.id)
				//returns the user that was deleted
				res.json(user)
			} else {
				//error if user not found
				res.status(404).json({
					message: "The user with the specified ID does not exist.",
				})
			}
		} catch (error) {
			res.status(500).json({
				errorMessage: "The user could not be removed."
			})
		}
	}),

	//updating user
	server.put("/api/users/:id", (req, res) => {
		const user = db.getUserById(req.params.id)
		try {
			//ensures that the user has a both a name and bio
			if (!req.body.bio || !req.body.name) {
				res.status(400).json({
					errorMessage: "Please provide name and bio for the user."
				})
				//update user with the input here if it has both
			} else if (user) {
				const updatedUser = db.updateUser(user.id, {
					name: req.body.name || user.name,
					bio: req.body.bio || user.bio
				})
				res.status(200).json(updatedUser)
				//if the user id doesnt exist then throw a 404 not found
			} else {
				res.status(404).json({
					message: "The user with the specified ID does not exist.",
				})
			}
			//catch for some other error
		} catch (error) {
			res.status(500).json({
				errorMessage: "The user could not be modified"
			})
		}
	}),
//server is listening
	server.listen(8080, () => {
		console.log("server started on port 8080")
	})