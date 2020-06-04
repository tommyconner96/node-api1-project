//imports
const express = require("express")
const db = require("./database.js")
//express
const server = express()

//installing middleware
server.use(express.json())

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
	//MIGHT HAVE TO COME BACK TO THIS!!! ALL CAPS SO I NOTICE LATER
	if (!newUser) {
		return res.status(500).json({
			errorMessage: "There was an error while saving the user to the database"
		})
	}
})

//returns an array of users
server.get("/api/users", (req, res) => {
	const users = db.getUsers()
	res.json(users)

	//MIGHT HAVE TO COME BACK TO THSI ONE TOO
	if (!users) {
		return res.status(500).json({
			errorMessage: "The users information could not be retrieved."
		})
	}
})

//gets user by id
server.get("/api/users/:id", (req, res) => {
	// The param variable matches up to the name of our URL param above
	const user = db.getUserById(req.params.id)

	//validation to make sure the user exists
	if (user) {
		res.json(user)
	} else {
		res.status(404).json({
			message: "The user with the specified ID does not exist.",
		})
	}
	//COME BACK TO THIS TOO
	if (!user) {
		return res.status(500).json({
			errorMessage: "The user information could not be retrieved."
		})
	}
})

//delete user by id
server.delete("/api/users/:id", (req, res) => {
	const user = db.getUserById(req.params.id)

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
		//COME BACK TO THIS TOO
		if (!user) {
			return res.status(500).json({
				errorMessage: "The user could not be removed."
			})
		}
})

//updating user
server.put("/api/users/:id", (req, res) => {
	const user = db.getUserById(req.params.id)

	if (!req.body.bio || !req.body.name) {
		res.status(400).json({
			errorMessage: "Please provide name and bio for the user."
		})
	} else if (user) {
			const updatedUser = db.updateUser(user.id, {
				name: req.body.name || user.name,
				bio: req.body.bio || user.bio
			})
			res.status(200).json(updatedUser)
		} else {
			res.status(404).json({
				message: "The user with the specified ID does not exist.",
			})
		}
})

server.listen(8080, () => {
	console.log("server started on port 8080")
})