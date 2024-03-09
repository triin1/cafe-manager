const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema ({
    employeeLevel: {
        type: String,
        enum: ['cafe manager', 'senior barista', 'junior barista', 'baker', 'junior baker']
    },
    hourlyWage: {
        type: Number
    },
    timeSpent: Number,
}, {
    timestamps: true
});

module.exports = mongoose.model('Employee', employeeSchema);