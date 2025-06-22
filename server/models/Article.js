const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true
    },

    content : {
        type : String,
        required : true
    },

    excerpt : {
        type : String,
        required : true,
        maxlength : 300
    },

    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },

    tags : [{
        type : String,
        trim : true,
        lowercase : true
    }],

    category : {
        type : String,
        required : true,
        trim : true
    },

    isPublished : {
        type : Boolean,
        default : false
    },

    views : {
        type : Number,
        default : 0
    },

    likes : {
        type : Number,
        default : 0
    },

    readingTime : {
        type : Number, // which would indicate in minutes
        default : 0
    },

    // AI Processed Content Features

    contentVector : [{
        type : Number
    }],

    topics : [{
        name : String,
        confidence : Number
    }],

    sentiment : {
        score : Number,
        label : String
    },

    entities : [{
        text : String,
        type : String
    }]
}, {
    timestamps : true
});

articleSchema.pre("save", function(next){
    if (this.isModified('content')){
        const wordsPerMinute = 200;
        const wordCount = this.content.split(/\s+/).length;
        this.readingTime = Math.ceil(wordCount/wordsPerMinute);
    }

    next();
});
    
module.exports = mongoose.model('Article',articleSchema);