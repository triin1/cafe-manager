let SKUNumberRecipe = document.getElementById('SKUNumberRecipe')
let yieldsRecipe = document.getElementById('yieldsRecipe')
let materialCost = document.getElementById('materialCost')

document.getElementById('SKUNameRecipe').addEventListener('change', function(i) {
    const SKU = this.value;
    const recipe = recipes.find((r) => r.SKUName === SKU)
    SKUNumberRecipe.innerHTML = recipe.SKUNumber;
    yieldsRecipe.innerHTML = recipe.yields;
    materialCost.innerHTML = recipe.materialCost;
});


let emplyeeLevel = document.getElementById('employeeLevel');
let hourlyWage = document.getElementById('hourlyWage');

employeeLevel.addEventListener('change', function() {
    const employeeLevel = this.value;
    const employee = employees.find((e) => e.employeeLevel === employeeLevel);
    hourlyWage.innerHTML = employee.hourlyWage;
});