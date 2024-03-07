const Inventory = require('../models/inventory');
const Recipe = require('../models/recipe');
const Employee = require('../models/employee');


async function newOutput(req, res) {
    const recipes = await Recipe.find({});
    const employees = await Employee.find({});
    const inventories = await Inventory.find({});
    res.render('outputs/new', { title: 'Make food and drinks', recipes, employees, inventories, errorMsg:'' });
};

async function create(req, res) {
    try {
        const inventory = await Inventory.create(req.body);
        let labour = await Employee.findOne({employeeLevel: req.body.employeeLevel});
        labour.hourlyWage = req.body.hourlyWage;
        labour.timeSpent = req.body.timeSpent;
        inventory.labour = inventory;
        await labour.save();
        inventory.labourCost.push(labour);
        await inventory.save();

        let recipe = await Recipe.findOne({SKUName: req.body.SKUName});
        inventory.recipe = inventory;
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