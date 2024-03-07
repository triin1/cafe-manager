const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const financialsSchema = new Schema ({
    SKUName: String,
    salesPrice: Number,
    salesQuantity: Number,
    salesDate: Date,
    materialCost: Number,
    labourCost: Array,
    inventory: [{
        type: Schema.Types.ObjectId,
        ref: 'Inventory'
    }],
    labourCost: [{
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    }], 
}, {
    timestamps: true
});

module.exports = mongoose.model('Financial', financialsSchema);