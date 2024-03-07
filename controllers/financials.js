const Inventory = require('../models/inventory');
const Financial = require('../models/financial');
const Employee = require('../models/employee');
const Recipe = require('../models/recipe');


async function financialsIndex(req, res) {
    const financials = await Financial.find({});
    let salesPrice = financials.map(financial => financial.salesPrice);
    let salesQuantity = financials.map(financial => financial.salesQuantity);
    
    let revenue = [];
    for (i = 0; i < salesPrice.length; i++) {
        for (let j=0; j < 1; j++) {
        revenue.push(salesPrice[i] * salesQuantity[i])
        };
    };

    

    res.render('financials', { title: 'Overview of the financial results', financials, revenue, errorMsg:'' });
};



module.exports = {
    index: financialsIndex
}