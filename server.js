//imports
const express = require("express")
const db = require("./database.js")
//express
const server = express()

//installing middleware
server.use(express.json())

//posts a new user
server.post("/api/users", (req, res) => {
	//validation to make sure theres a name for the user
	if (!req.body.name) {
		return res.status(400).json({
			message: "Need a name for the user",
		})
	}
//new user
	const newUser = db.createUser({
		name: req.body.name,
		bio: req.body.bio,
	})
	res.status(201).json(newUser)
})

//returns an array (hopefully) of users
server.get("/api/users", (req, res) => {
	const users = db.getUsers()
	res.json(users)
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
			message: "User not found",
		})
	}
})

//delete user by id
server.delete("/api/users/:id", (req, res) => {
	const user = db.getUserById(req.params.id)

	if (user) {
		db.deleteUser(user.id)
		//returns the user that was deleted
		res.json(user)
	} else {
		res.status(404).json({
			message: "User not found",
		})
	}
})

//updating user
server.put("/api/users/:id", (req, res) => {
	const user = db.getUserById(req.params.id)

	//user validation to make sure it exists and has the right properties
	if (user) {
		const updatedUser = db.updateUser(user.id, {
			name: req.body.name || user.name,
			bio: req.body.bio || user.bio
		})
		res.json(updatedUser)
	} else {
		res.status(404).json({
			message: "User not found",
		})
	}
})

server.listen(8080, () => {
	console.log("server started on port 8080")
})