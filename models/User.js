const {Schema, model, Types} = require('mongoose');


const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    recipes: [{type: Types.ObjectId, ref: 'Recipe'}]
});

module.exports = model('User', userSchema);