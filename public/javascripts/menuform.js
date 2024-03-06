let SKUNumberRecipe = document.getElementById('SKUNumberRecipe')
let yieldsRecipe = document.getElementById('yieldsRecipe')

document.getElementById('SKUNameRecipe').addEventListener('change', function() {
    const SKU = this.value;
    const recipe = recipes.find((r) => r.SKUName === SKU)
    SKUNumberRecipe.innerHTML = recipe.SKUNumber;
    yieldsRecipe.innerHTML = recipe.yields;


  
    //// this version actually calculates but has arrays the wrong way around
    // let totalCost = 0;
    // ingredientList.forEach(function(i, index) {
    //     console.log(inventories);
    //     console.log(inventories[index].SKUName);
    //     //console.log(recipe.ingredients[index].ingredientName);
    //     let items = (`${recipe.ingredients[index].ingredientQuantity} ${recipe.ingredients[index].ingredientUnit} ${recipe.ingredients[index].ingredientName}`);
    //     //console.log(items);
    //     if (inventories[index].SKUName === recipe.ingredients[index].ingredientName) {

    //         let price = inventories[index].purchaseCost / inventories[index].quantity;
    //         //console.log(price);
    //         let itemCost = `${recipe.ingredients[index].ingredientQuantity}` * price;
    //         totalCost += itemCost;
    //         //console.log(totalCost);
    //         }
    //     });
        
        
        
    //         }
    //     });
    // });
});


let emplyeeLevel = document.getElementById('employeeLevel');
let hourlyWage = document.getElementById('hourlyWage');

employeeLevel.addEventListener('change', function() {
    const employeeLevel = this.value;
    const employee = employees.find((e) => e.employeeLevel === employeeLevel);
    hourlyWage.innerHTML = employee.hourlyWage;
});