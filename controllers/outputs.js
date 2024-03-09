const Inventory = require('../models/inventory');
const Recipe = require('../models/recipe');
const Employee = require('../models/employee');


async function newOutput(req, res) {
    // Request all information "Make food and drinks" form needs access to (outputs/new.ejs view)
    const recipes = await Recipe.find({});
    const employees = await Employee.find({});
    const inventories = await Inventory.find({});
    res.render('outputs/new', { title: 'Make food and drinks', recipes, employees, inventories, errorMsg:'' });
};

async function create(req, res) {
    try {
        // Create an inventory item (finished product) from "Make food and drinks" form
        const inventory = await Inventory.create(req.body);

        // Create labour cost per unit for the inventory item from "Make food and drinks" form
        let labour = await Employee.findOne({ employeeLevel: req.body.employeeLevel });
        labour.hourlyWage = req.body.hourlyWage;
        labour.timeSpent = (req.body.timeSpent / inventory.quantity);
        inventory.labour = inventory;
        await labour.save();
        inventory.labourCost.push(labour);
        await inventory.save();

        // Create material cost for the inventory item from "Make food and drinks" form
        let recipe = await Recipe.findOne({ SKUName: req.body.SKUName });
        recipe.materialCost = req.body.materialCost;
        inventory.recipe = inventory;
        await recipe.save();
        inventory.recipe.push(recipe);
        await inventory.save();

        res.redirect('/finished');
    } catch (err) {
        console.log(err);
        res.render('outputs/new', { errorMsg: err.message })
    }
};


module.exports = {
    new: newOutput,
    create,
}