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
        let inventory = await Inventory.create(req.body); 
        const labour = await Employee.create(req.body);
        inventory.labour = inventory;
        inventory.labourCost.push(labour);
        await inventory.save();

        const recipe = await Recipe.create(req.body);
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