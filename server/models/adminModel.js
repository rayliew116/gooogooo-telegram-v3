const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true });

// Static Signup Method
adminSchema.statics.signup = async function(username, password) {

    // Input validation
    if (!username || !password) {
        throw Error('All fields must be filled.');
    }
    if (!validator.matches(username, "^[a-z0-9_\.]*$")) {
        throw Error('Username can only contains lowercase letters, "0-9", "_" and "."');
    }

    const usernameExists = await this.findOne({ username });
    if (usernameExists) {
        throw Error('Username is taken.');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const admin = await this.create({ username, password: hash });

    return admin;
}

// Static Login Method
adminSchema.statics.login = async function(username, password) {

    if (!username || !password) {
        throw Error('All fields must be filled.');
    }

    const admin = await this.findOne({ username });
    if (!admin) {
        throw Error('Incorrect username.');
    }

    const match = await bcrypt.compare(password, admin.password);

    if (!match) {
        throw Error('Incorrect password.');
    }

    return admin;
}

module.exports = mongoose.model('admin', adminSchema);