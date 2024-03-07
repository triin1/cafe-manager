const Inventory = require('../models/inventory');
const Employee = require('../models/employee');


async function finishIndex(req, res) {
    const inventories = await Inventory.find({status: 'finished product'}).populate('labourCost').populate('recipe');
    
    let timeSpent = inventories.map(inventory => inventory.labourCost.map(labour => labour.timeSpent));
    let hourlyWage = inventories.map(inventory => inventory.labourCost.map(labour => labour.hourlyWage));
    let quantity = inventories.map(inventory => inventory.quantity);
    
    let costOfLabour = [];
    for (let i = 0; i < timeSpent.length; i++) {
        for (let j=0; j < 1; j++) {
            costOfLabour.push((timeSpent[i] * hourlyWage[i])/60);
        }
    };

    let materialCost = inventories.map(item => item.materialCost);
    let materialCostPerUnit = [];
    for (let i = 0; i < materialCost.length; i++) {
        for (let j=0; j < 1; j++) {
            materialCostPerUnit.push(materialCost[i] / quantity[i]);
        }
    };

    res.render('finished', { title: 'Detailed list of finished products', inventories, costOfLabour, materialCostPerUnit, errorMsg:'' });
};

async function show(req, res) {
    const inventories = await Inventory.find({});
    const inventory = await Inventory.findById(req.params.id);
    res.render('finished/show', { title: `Sell or add notes to ${inventory.SKUName}`, inventory, inventories });
};

async function createNote(req, res) {
    const inventory = await Inventory.findById(req.params.id);
    inventory.note = req.body.note;
    try {
        await inventory.save();
    } catch (err) {
        console.log(err);
    }
    res.redirect('/finished/' + req.params.id)
}

// function deleteProduct(req, res, next) {
//     Inventory.findOne(req.params.id).then(function(item) {
//         if (!item) return res.redirect("/finished");
//         inventory.remove(req.params.id);
//         inventory.save().then(function() {
//           res.redirect('/finished');
//         }).catch(function(err) {
//           return next(err);
//         });
//       });
// }

module.exports = {
    index: finishIndex,
    show,
    create: createNote,
    //delete: deleteProduct
}