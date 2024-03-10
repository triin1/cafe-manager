let SKUNumberRecipe = document.getElementById('SKUNumberRecipe')
let yieldsRecipe = document.getElementById('yieldsRecipe')
let materialCost = document.getElementById('materialCost')
let ingredients = document.getElementById('ingredients')


document.getElementById('SKUNameRecipe').addEventListener('change', function() {
    const SKU = this.value;
    const recipe = recipes.find((r) => r.SKUName === SKU)
    SKUNumberRecipe.innerHTML = recipe.SKUNumber;
    yieldsRecipe.innerHTML = recipe.yields;
    materialCost.innerHTML = recipe.materialCost;

    // Displays the list of ingredients used for the recipe
    ingredients.innerHTML = "";
    for (let i=0; i < recipe.ingredients.length; i++) {
        let ingredient = (`${recipe.ingredients[i].ingredientQuantity} ${recipe.ingredients[i].ingredientUnit} ${recipe.ingredients[i].ingredientName}`);
        let list = document.createElement('li');
        list.innerHTML = ingredient;
        ingredients.appendChild(list);
    };

});


let emplyeeLevel = document.getElementById('employeeLevel');
let hourlyWage = document.getElementById('hourlyWage');

employeeLevel.addEventListener('change', function() {
    const employeeLevel = this.value;
    const employee = employees.find((e) => e.employeeLevel === employeeLevel);
    hourlyWage.innerHTML = employee.hourlyWage;
});