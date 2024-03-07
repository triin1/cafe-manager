const Inventory = require('../models/inventory');
const Financial = require('../models/financial')


async function newSales(req, res) {
    const inventory = await Inventory.findById(req.params.id);
    res.render('sales/new', { title: `Sell ${inventory.SKUName}`, errorMsg:'' });
};

async function createSale(req, res) {
    try {
        const financials = await Financial.create(req.body);
        res.redirect('/financials');
    } catch (err) {
        console.log(err);
        res.render('sales/new', { errorMsg: err.message })
    }
};

module.exports = {
    new: newSales,
    create: createSale
}