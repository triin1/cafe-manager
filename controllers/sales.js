const Inventory = require('../models/inventory');
const Financial = require('../models/financial')


async function newSales(req, res) {
    const inventory = await Inventory.findById(req.params.id);
    res.render('sales/new', { title: `Sell ${inventory.SKUName}`, inventory, errorMsg:'' });
};

async function createSale(req, res) {
    try {
        let financials = await Financial.create(req.body)
        
        let inventory = await Inventory.findOne({SKUName: req.body.SKUName});
        financials.materialCost = inventory.materialCost;
        await financials.save();

        financials.labourCost = inventory.labourCost;
        await financials.save();        

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