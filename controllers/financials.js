const Inventory = require('../models/inventory');
const Financial = require('../models/financial');


async function financialsIndex(req, res) {
    const financials = await Financial.find({}).populate('inventory').populate('labourCost');
    const inventories = await Inventory.find({ status: 'finished product'});
    
    let salesPrice = financials.map(financial => financial.salesPrice);
    let salesQuantity = financials.map(financial => financial.salesQuantity);

    let revenue = [];
    let avgRevUnit = [];
    for (i = 0; i < salesPrice.length; i++) {
        for (let j=0; j < 1; j++) {
            revenue.push(salesPrice[i] * salesQuantity[i]);
            avgRevUnit.push(revenue[i] / salesQuantity[i]);
        };
    };    

    let timeSpent = financials.map(financial => financial.labourCost.map(labour => labour.timeSpent));
    let hourlyWage = financials.map(financial => financial.labourCost.map(labour => labour.hourlyWage));
    let costOfLabour = [];
    for (let i = 0; i < timeSpent.length; i++) {
        for (let j=0; j < 1; j++) {
            costOfLabour.push((timeSpent[i] * hourlyWage[i])/60);
        }
    };

    let materialCost = financials.map(item => item.materialCost);

    let profit = [];
    for (let i = 0; i < revenue.length; i++) {
        for (let j=0; j < 1; j++) {
            profit.push(revenue[i]-costOfLabour[i] * salesQuantity[i] -materialCost[i] * salesQuantity[i]);
        }
    };


    res.render('financials', { title: 'Overview of the financial results', financials, revenue, avgRevUnit, costOfLabour, profit, errorMsg:'' });
};


module.exports = {
    index: financialsIndex
}