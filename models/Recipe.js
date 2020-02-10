const {Schema, model, Types} = require('mongoose');
const mongooseHistory = require('mongoose-history');


const recipeSchema = new Schema({
    title: {type: String, required: true},
    calories: {type: Number, required: true},
    ingredients: {type: String, required: true},
    preparation: {type: String},
    __history: {type: Array},
    owner: {type: Types.ObjectId, ref: 'User'}
},
    {
        timestamps: true,
    });

recipeSchema.plugin(mongooseHistory);

module.exports = model('Recipe', recipeSchema);