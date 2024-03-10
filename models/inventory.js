const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const inventorySchema = new Schema ({
    SKUNumber: {
        type: String,
        match: /[A-Z][A-Z][0-9]{4,6}/,
        required: true
    },
    SKUName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['raw material', 'finished product'],
    },
    quantity: {
        type: Number,
        required: true
    },
    measureUnit: {
        type: String,
        enum: ['grams', 'pieces', 'millilitres', ]
    },
    purchaseCost: Number,
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
    materialCost: Number,
    note: String,
}, {
    timestamps: true,
    methods: {
        costPerUnit: function() {
            let costPerUnit = (this.purchaseCost / this.quantity).toFixed(2);
            return costPerUnit;
        },
    }
});

module.exports = mongoose.model('Inventory', inventorySchema);