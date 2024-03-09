const Financial = require('../models/financial');


async function financialsIndex(req, res) {
    // Find financials to be displayed in the "business results" page
    const financials = await Financial.find({}).populate('inventory').populate('labourCost');
    
    // Calculate total revenue and revenue per unit from sale of products
    let salesPrice = financials.map(financial => financial.salesPrice);
    let salesQuantity = financials.map(financial => financial.salesQuantity);

    let revenue = [];
    for (i = 0; i < salesPrice.length; i++) {
        for (let j=0; j < 1; j++) {
            revenue.push(salesPrice[i] * salesQuantity[i]);
        };
    };    

    // Calculate labour cost per unit
    let timeSpent = financials.map(financial => financial.labourCost.map(labour => labour.timeSpent));
    let hourlyWage = financials.map(financial => financial.labourCost.map(labour => labour.hourlyWage));
    
    let costOfLabour = [];
    for (let i = 0; i < timeSpent.length; i++) {
        for (let j=0; j < 1; j++) {
            costOfLabour.push((timeSpent[i] * hourlyWage[i])/60);
        }
    };

    // Material cost per unit
    let materialCost = financials.map(item => item.materialCost);

    // Calculate profit per each sale of product
    let profit = [];
    for (let i = 0; i < revenue.length; i++) {
        for (let j=0; j < 1; j++) {
            profit.push(revenue[i]-costOfLabour[i] * salesQuantity[i] -materialCost[i] * salesQuantity[i]);
        }
    };

    res.render('financials', { title: 'Overview of the financial results', financials, revenue, costOfLabour, profit, errorMsg:'' });
};


module.exports = {
    index: financialsIndex
}