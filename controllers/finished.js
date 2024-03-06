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

    const recipes = await Recipe.find({});
    const rawMaterials = await Inventory.find({status: 'raw material'});
    let purchaseCost = rawMaterials.map(inventory => inventory.purchaseCost);
    let purchaseName = rawMaterials.map(inventory => inventory.SKUName);
    let purchaseQuantity = rawMaterials.map(inventory => inventory.quantity);
    let recipeQuantity = recipes.map(recipe => recipe.ingredients.map(ingredient => ingredient.ingredientQuantity));
    let recipeName = recipes.map(recipe => recipe.ingredients.map(ingredient => ingredient.ingredientName));
    let materialCost = [];
    inventories.forEach(() => {
        for (let i = 0; i < recipes.length; i++) {
            if (purchaseName.includes(recipeName)) {
                materialCost.push(purchaseCost / purchaseQuantity * recipeQuantity);
                
            }
        }
    })
    console.log(materialCost);


    const employees = await Employee.find({});
    res.render('finished', { title: 'Detailed list of finished products', inventories, employees, costOfLabour, errorMsg:'' });
};


module.exports = {
    index: finishIndex
}