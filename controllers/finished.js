const Inventory = require('../models/inventory');


async function finishIndex(req, res) {
    // Find inventory items with status of "finished product" to be displayed in the "finished products" page
    const inventories = await Inventory.find({status: 'finished product'}).populate('labourCost').populate('recipe');
    
    // Calculate labour cost per unit
    let timeSpent = inventories.map(inventory => inventory.labourCost.map(labour => labour.timeSpent));
    let hourlyWage = inventories.map(inventory => inventory.labourCost.map(labour => labour.hourlyWage));
    
    let costOfLabour = [];
    for (let i = 0; i < timeSpent.length; i++) {
        for (let j=0; j < 1; j++) {
            costOfLabour.push((timeSpent[i] * hourlyWage[i])/60);
        }
    };

    // Calculate material cost per unit
    let materialCost = inventories.map(item => item.materialCost);
    let quantity = inventories.map(inventory => inventory.quantity);

    let materialCostPerUnit = [];
    for (let i = 0; i < materialCost.length; i++) {
        for (let j=0; j < 1; j++) {
            materialCostPerUnit.push(materialCost[i] / quantity[i]);
        }
    };

    res.render('finished', { title: 'Detailed list of finished products', inventories, costOfLabour, materialCostPerUnit, errorMsg:'' });
};

async function show(req, res) {
    // Display an "action" page for a specific finished product item to sell the product or add notes
    const inventory = await Inventory.findById(req.params.id);
    res.render('finished/show', { title: `Sell or add notes to ${inventory.SKUName}`, inventory });
};

async function createNote(req, res) {
    // Add a note to a specific inventory item
    const inventory = await Inventory.findById(req.params.id);
    inventory.note = req.body.note;
    try {
        await inventory.save();
    } catch (err) {
        console.log(err);
    }
    res.redirect('/finished/' + req.params.id)
}


module.exports = {
    index: finishIndex,
    show,
    create: createNote
}