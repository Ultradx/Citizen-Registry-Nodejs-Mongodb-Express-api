const mongoose = require('mongoose');

const citizenSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    at: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    sex: { type: String, required: true },
    birthYear: { type: Date, required: true },
    afm: { type: Number, default: null},
    amka: { type: Number, default: null},
    location: { type: String,default: null}
    
});

module.exports = mongoose.model('Citizen', citizenSchema);