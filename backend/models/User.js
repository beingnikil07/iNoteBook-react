const mongoose = require('mongoose')

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
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
    date: {
        type: Date,
        default: Date.now     // don't write () after now ,kyuki humko isko jvv call karna hai jvv actual mai koi document insert hone wala hoga 
    },
});

module.exports = mongoose.model('user', UserSchema);
//mongoose.model ko 2 chez chahiye hoti hai pehli hai name of module jo kii user hai ,aur dusra chahiye hota hai schema ka name
