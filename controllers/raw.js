const Inventory = require('../models/inventory');


async function index(req, res) {
    const inventories = await Inventory.find({status: "raw material"});
    res.render('raw', { title: 'Detailed list of raw materials', inventories, errorMsg:'' });
};


module.exports = {
    index
}