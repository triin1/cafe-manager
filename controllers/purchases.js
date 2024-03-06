const Inventory = require('../models/inventory');


function newPurchase(req, res) {
    res.render('purchases/new', { title: 'Enter a purchase order', errorMsg:'' });
};

async function create(req, res) {
    try {
        const inventories = await Inventory.create(req.body);
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