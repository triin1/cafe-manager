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
    purchaseQuantity: Number,
    purchaseUnit: {
        type: String,
        enum: ['grams', 'pieces', 'millilitres', ]
    },
    purchaseCost: {
        type: Number,
        match: /[0-9]{1,4}\.[0-9]{2}/
    },
    purchaseDate: Date,
    productionDate: Date,
    expiryDate: Date,
}, {
    timestamps: true,
    methods: {
        costPerUnit: function() {
            let costPerUnit = (this.purchaseCost / this.purchaseQuantity).toFixed(2);
            return costPerUnit;
        }
    }
});


module.exports = mongoose.model('Inventory', inventorySchema);