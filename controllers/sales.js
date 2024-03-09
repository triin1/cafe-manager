const Inventory = require('../models/inventory');
const Financial = require('../models/financial')


async function newSales(req, res) {
    // Display the form for selling a specific product
    const inventory = await Inventory.findById(req.params.id);
    res.render('sales/new', { title: `Sell ${inventory.SKUName}`, inventory, errorMsg:'' });
};

async function createSale(req, res) {
    try {
        // Create financial results from selling an item (form in sales/new.ejs view)
        let financials = await Financial.create(req.body)
        
        // Create material cost per unit for the sold inventory item for the financials view
        let inventory = await Inventory.findOne({SKUName: req.body.SKUName});
        financials.materialCost = (inventory.materialCost / inventory.quantity);
        await financials.save();

        // Create labour cost per unit for the sold inventory item for the financials view
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