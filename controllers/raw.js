const Inventory = require('../models/inventory');


async function index(req, res) {
    // Find inventory items with status of "raw materials" to be displayed in the "raw materials" page
    const inventories = await Inventory.find({status: "raw material"});
    res.render('raw', { title: 'Detailed list of raw materials', inventories, errorMsg:'' });
};


module.exports = {
    index
}