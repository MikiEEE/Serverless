const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
    	type: String,
    	unique: true, 
    	required: true
    }
});

module.exports = mongoose.model('User',UserSchema,'users');