const configs = require('../ServerConfigs/ServerConfigs.json')
exports.getMealPrice = (meal) => {
    meal['price'] = meal[(meal.showFront != null && meal.showFront != "" && configs.meals.sizes.includes(meal.showFront)) ? meal.showFront : sizes[0]];
    if (meal.price != null) {
        delete meal.price.active;
    }
    for (const s of configs.meals.sizes) {
        delete meal[s];
    }
    
}


