const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const inventorySchema = new Schema ({
    SKUNumber: {
        type: String,
        match: /[A-Z][A-Z][0-9]{4,6}/
    },
    SKUName: String,
    status: {
        type: String,
        enum: ['raw material', 'finished product'],
    },
    quantity: Number,
    measureUnit: {
        type: String,
        enum: ['grams', 'pieces', 'millilitres', ]
    },
    purchaseCost: {
        type: Number,
        //type: mongoose.Types.Decimal128,
        //match: /[0-9]{1,4}\.[0-9]{2}/
    },
    purchaseDate: Date,
    productionDate: Date,
    expiryDate: Date,
    labourCost: [{
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    }],
    recipe: [{
        type: Schema.Types.ObjectId,
        ref: 'Recipe'
    }],
    materialCost: Number
}, {
    timestamps: true,
    methods: {
        costPerUnit: function() {
            let costPerUnit = (this.purchaseCost / this.quantity).toFixed(2);
            return costPerUnit;
        },
        // materialCost: function() {
        //     let materialCost = (this.recipe.ingredients)
        // }
    }
});


module.exports = mongoose.model('Inventory', inventorySchema);