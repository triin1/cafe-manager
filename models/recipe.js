const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ingredientSchema = new Schema ({
    ingredientQuantity: Number,
    ingredientUnit: {
        type: String,
        enum: ['grams', 'pieces', 'millilitres', ]
    },
    ingredientName: String
}, {
    timestamps: true
});

const recipeSchema = new Schema ({
    SKUNumber: {
        type: String,
        match: /[A-Z][A-Z][0-9]{4,6}/
    },
    SKUName: String,
    status: {
        type: String,
        enum: ['finished product'],
    },
    yields: Number,
    ingredients: [ingredientSchema],
    materialCost: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Recipe', recipeSchema);