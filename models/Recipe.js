const {Schema, model, Types} = require('mongoose');

const recipeSchema = new Schema({
    title: {type: String,  default: "Name"},
    calories: {type: Number,  default: 0},
    ingredients: {type: String,  default: "Ingredients"},
    preparation: {type: String, default: "Preparation"},
    __history: {type: Array},
    owner: {type: Types.ObjectId, ref: 'User'}
},
    {
        timestamps: true,
    });

module.exports = model('Recipe', recipeSchema);