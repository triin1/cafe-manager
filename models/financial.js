const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const financialsSchema = new Schema ({
    salesPrice: Number,
    salesQuantity: Number,
    salesDate: Date,
    labourCost: [{
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    }],
    inventory: [{
        type: Schema.Types.ObjectId,
        ref: 'Inventory'
    }],
    
}, {
    timestamps: true,
});

module.exports = mongoose.model('Financial', financialsSchema);