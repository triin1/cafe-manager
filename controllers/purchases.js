const Inventory = require('../models/inventory');


function newPurchase(req, res) {
    res.render('purchases/new', { title: 'Enter a purchase order', errorMsg:'' });
};

async function create(req, res) {
    try {
        const inventories = await Inventory.create(req.body);
        res.redirect('/inventories')
    } catch (err) {
        console.log(err);
        res.render('purchases/new', { errorMsg: err.message })
    }
};




module.exports = {
    new: newPurchase,
    create
}