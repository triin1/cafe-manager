const Inventory = require('../models/inventory');
const Employee = require('../models/employee');
const Recipe = require('../models/recipe');


async function finishIndex(req, res) {
    const inventories = await Inventory.find({status: 'finished product'}).populate('labourCost').populate('recipe');
    
    let timeSpent = inventories.map(inventory => inventory.labourCost.map(labour => labour.timeSpent));
    let hourlyWage = inventories.map(inventory => inventory.labourCost.map(labour => labour.hourlyWage));
    let costOfLabour = [];
    for (let i = 0; i < timeSpent.length; i++) {
        for (let j=0; j < 1; j++) {
            costOfLabour.push((timeSpent[i] * hourlyWage[i])/60);
        }
    };

    const employees = await Employee.find({});
    res.render('finished', { title: 'Detailed list of finished products', inventories, employees, costOfLabour, errorMsg:'' });
};

async function show(req, res) {
    const inventories = await Inventory.find({});
    const inventory = await Inventory.findById(req.params.id);
    res.render('finished/show', { title: 'Sell or add notes to the item', inventory, inventories });
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


module.exports = {
    index: finishIndex,
    show,
    create: createNote
}