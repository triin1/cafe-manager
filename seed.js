require('dotenv').config();
require('./config/database');

const Recipe = require('./models/recipe');
const Employee = require('./models/employee')

const data = require('./data');

(async function() {
    const recipe = Recipe.deleteMany({});
    const employee = Employee.deleteMany({});

    let results = await Promise.all([recipe, employee]);
  
    results = await Promise.all([
        Recipe.create(data.recipes),
        Employee.create(data.employees)
    ])

    process.exit();
})();