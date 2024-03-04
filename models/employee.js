const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema ({
    employeeLevel: {
        type: String,
        enum: ['cafe manager', 'senior barista', 'junior barista', 'baker', 'junior baker']
    },
    hourlyWage: {
        type: Number,
        enum: ['35', '27', '22', '33', '23']
    },
    timeSpent: Number,
}, {
    timestamps: true,
    methods: {
        labourCost: function() {
            let labourCost = (this.hourlyWage * this.timeSpent/60).toFixed(2);
            return labourCost
        }
    }
});

module.exports = mongoose.model('Employee', employeeSchema);