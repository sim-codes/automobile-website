const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        }
    },
    { timestamps: true}
)

// compare userpassword with hashed password
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};
  
module.exports = mongoose.model('User', userSchema);