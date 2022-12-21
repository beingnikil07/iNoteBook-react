const mongoose = require('mongoose')
const { Schema } = mongoose;

const NotesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default:"Genral",
    },
    date: {
        type: Date,
        default: Date.now,     // don't write () after now ,kyuki humko isko jvv call karna hai jvv actual mai koi document insert hone wala hoga 
    },
});

module.exports = mongoose.model('notes', NotesSchema);