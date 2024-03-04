require('dotenv').config();
require('./config/database');

const Recipe = require('./models/recipe');

const data = require('./data');

(async function() {
  // const results = await Recipe.deleteMany({});
  
  results = await Recipe.create(data.recipes);

  process.exit();
})();