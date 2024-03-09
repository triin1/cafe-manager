const Inventory = require('../models/inventory');


function newPurchase(req, res) {
    res.render('purchases/new', { title: 'Enter a purchase order', errorMsg:'' });
};

async function create(req, res) {
    try {
        // Create an inventory item (raw material) from "Enter a purchase order" form 
        await Inventory.create(req.body);
        res.redirect('/raw')
    } catch (err) {
        console.log(err);
        res.redirect('/purchases/new', { errorMsg: err.message })
    }
}


module.exports = {
    new: newPurchase,
    create
}