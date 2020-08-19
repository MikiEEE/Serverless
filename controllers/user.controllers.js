const User = require('../models/user.model.js');



exports.all = async (req, res) => {
	try {
		const users =  await User.find()
		res.send(users);
	} catch (err) {
		res.status(500).send(err);
	}
}


exports.getOne = async (req, res) => {
	try {
		const user = await User.findOne({email:req.params.email});
		res.send(user);
	} catch(err) {
		res.status(500).send(err);
	}
}


exports.create = async (req, res) => {
	try{
		const user = new User(req.body);
		await user.save();

		res.send(user);
	} catch(err) {
		res.status(500).send(err);
	}
}


exports.update = async (req, res) => {
	try {
		const user = await User.findOneAndUpdate(
							{email: req.params.email},
							req.body, 
							{new: true}
						);
		await user.save();
		res.send(user);
	} catch (err) {
		res.status(500).send(err);
	}
}


exports.delete = async (req, res) => {
	try {
		const user = await User.findOneAndRemove({email:req.params.email});
		res.send(user)
	} catch(err) {
		res.status(500).send(err);
	}
}


