const jwt = require('jsonwebtoken');
const PublicData = require('../models/public');
const CollectorData = require('../models/collector');
const ReportData = require('../models/report');


exports.createUser = async (req, res) => {
    const { name, role, mobile, email, password } = req.body;
    
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
            mobile,
            email,
            password,
            activeAccount
        });
    } else if (role === 'public') {

        isNewUser = await PublicData.isThisEmailInUse(email);
        if (!isNewUser) {
            return res.send({ status: false, message: 'Email already in use' });
        }

        userData = new PublicData({
            name,
            mobile,
            email,
            password,
        });
    } else {
        // Handle unsupported roles or provide a default collection
        return res.status(400).send('Invalid user role');
    }

    await userData.save();

    // const tokenRegister = jwt.sign(
    //     { userId: user._id },
    //     process.env.JWT_SECRET,
    //     { expiresIn: '2h' }
    // )

    return res.send({status: true, message:'Registration Succesfull'});
};

exports.userSignInPublic = async (req, res) => {
    const { email, password } = req.body;
    
    const user = await PublicData.findOne({ email });
    
    if (!user) {
        return res.json({
            status: false,
            message: 'User not found'
        });
    }; 
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.json({
            status: false,
            message: 'Password does not match'
        });
    }
    
    const tokenPublic = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
    );

    return res.json({
        status: true,
        message: 'login successful',
        name : user.name,
        email: user.email,
        mobile: user.mobile,
        tokenPublic,
        userId: user._id
    });
    
};


exports.userSignInCollector = async (req, res) => {
    const { email, password } = req.body;
    
    const user = await CollectorData.findOne({ email });
    if (!user) {
        return res.json({
            status: false,
            message: 'User not found'
        });
    }  
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.json({
            status: false,
            message: 'Password does not match'
        });
    }
    
    const isActive = user.activeAccount;

    if (!isActive) {
        return res.json({
            status: false,
            message: 'Your account is not activated'
        })
    }
    

    const tokenCollector = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
    );

    return res.json({
        status: true,
        message: 'login successful',
        name : user.name,
        email : user.email,
        tokenCollector,
        userId: user._id
    });
};

exports.reportUser = async (req, res) => {
    const { name, number, title, feedback } = req.body;
    
    const reportData = new ReportData({
        name,
        number,
        title,
        feedback,
    });

    try {
        await reportData.save();
        return res.send({status: true, message:'Complaint succesfull'});
    } catch (error) {
        return res.json({
            status: false,
            message: error.message
        });
    }
    
};
