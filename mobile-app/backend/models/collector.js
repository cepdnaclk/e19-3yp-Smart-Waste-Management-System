const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userCollectorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: false
            
        },
        mobile: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        confirmPassword: {
            type: String,
            required: false
        },
        activeAccount: {
            type: Boolean,
            required: true
        }
    },
    {collection: "collector-data"}
);


userCollectorSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, 8, (err, hashPassword) => {
            if (err) return next(err);

            this.password = hashPassword;
            next();  
        })
    }
})

userCollectorSchema.methods.comparePassword = async function (password) {
    if (!password) throw new Error("Password is missing, cannot compare!");

    try {
        const result = await bcrypt.compare(password, this.password);
        return result;
    } catch (error) {
        console.log("Error while comparing password!", error.message)
    }
}

userCollectorSchema.statics.isThisEmailInUse = async function (email) {
    if (!email) throw new error('Invalid Email');
    try {
        const user = await this.findOne({ email })
        if (user) return false;
    
        return true;
    } catch (error) {
        console.log('error inside isThisEmailInUse method', error.message);
        return false;
    }
    
}

module.exports = mongoose.model('userCollector', userCollectorSchema )