const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },

    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true
    },

    password : {
        type : String,
        required : true,
        minlength : 6
    },

    role : {
        type: String,
        enum : ['reader','creator'],
        default : 'reader'
    },

    interests : [{
        type : String,
        trim : true
    }],

    readingHistory :  [{
        articleId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Article'
        },

        readAt : {
            type : Date,
            default : Date.now
        },

        timeSpent : Number,
        liked : Boolean
    }],

    preferences : {
        topics : [String],
        contentTypes : [String]
    }
}, {
    timestamps : true
});

userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', userSchema);
