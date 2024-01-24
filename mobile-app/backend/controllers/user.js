const jwt = require('jsonwebtoken');
const PublicData = require('../models/public');
const CollectorData = require('../models/collector');


exports.createUser = async (req, res) => {
    const { name, role, mobile, email, password, confirmPassword } = req.body;
    
    let isNewUser
    let userData;

    // Choose the appropriate collection based on the user's role
    if (role === 'collector') {

        isNewUser = await CollectorData.isThisEmailInUse(email);
        if (!isNewUser) {
            return res.send({ status: false, message: 'Email already in use' });
        }

        const activeAccount = false;

        userData = new CollectorData({
            name,
            role,
            mobile,
            email,
            password,
            confirmPassword,
            activeAccount
        });
    } else if (role === 'public') {

        isNewUser = await PublicData.isThisEmailInUse(email);
        if (!isNewUser) {
            return res.send({ status: false, message: 'Email already in use' });
        }

        userData = new PublicData({
            name,
            role,
            mobile,
            email,
            password,
            confirmPassword
        });
    } else {
        // Handle unsupported roles or provide a default collection
        return res.status(400).send('Invalid user role');
    }

    await userData.save();
    return res.send({status: true, message:'Registration Succesfull'});
};

exports.userSignIn = async (req, res) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user)
        return res.json({
            success: false,
            message: 'user not found, with the given email'
        });
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch)
        return res.json({
            success: false,
            message: 'email/password does not match'
        });
    
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'})
        
    
    res.json({ success: true, user, token });
};

