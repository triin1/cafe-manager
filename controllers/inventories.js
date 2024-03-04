const Inventory = require('../models/inventory');


async function index(req, res) {
    const inventories = await Inventory.find({});
    res.render('inventories', { title: 'Detailed list of inventory', inventories, errorMsg:'' });
};


module.exports = {
    index
}