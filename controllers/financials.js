const Inventory = require('../models/inventory');
const Financial = require('../models/financial')
const Employee = require('../models/employee');
const Recipe = require('../models/recipe');


async function financialsIndex(req, res) {
    const inventories = await Inventory.find({});

    res.render('financials', { title: 'Overview of the financial results', inventories, errorMsg:'' });
};



module.exports = {
    index: financialsIndex
}