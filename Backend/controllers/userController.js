const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { isEmail, isStrongPassword } = require('validator')


const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d'})
}


// login user

const loginUser = async (req, res) => {
    const { identifier, password } = req.body
    try {

        const user = await User.findOne({
            $or: [{username: identifier}, { email:identifier}]
            
        })

        if(user){
            const auth = await bcrypt.compare(password, user.password)
            if(auth){
                const token = createToken(user._id)
                res.status(200).json({username, token})
            }
            throw Error(`Incorrect password or ${identifier}`)
        }
        throw Error('User does not exist')

        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


//signup user
const signupUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if (!email || !username || !password) {
            throw new Error('All fields must be filled');
        }

        if (!isEmail(email)) {
            throw new Error('Email is not valid');
        }

        if (!isStrongPassword(password)) {
            throw new Error('Password is not strong enough');
        }

        const emailExists = await User.findOne({ email });
        if (emailExists) {
            throw new Error('Email already in use');
        }

        const usernameExists = await User.findOne({ username });
        if (usernameExists) {
            throw new Error('Username already in use');
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await User.create({ email, username, password: hash });

        const token = createToken(user._id)

        res.status(200).json({username, token});
    } catch (error) {
        // Handle errors gracefully and send an error response
        res.status(400).json({ error: error.message });
    }
};


module.exports = {
    signupUser,
    loginUser
}