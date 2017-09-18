var getConnection = require('./create-connection');



module.exports = function selectNutritionValuesFromDateRange(week, userId) {
    var year = new Date().getFullYear();
    var from = week * 7;
    var to = from - 6;
    var data = [year, from, year, to, userId];
    var query = `
        SELECT
        ROUND(SUM(foods.energy / 100 * consumedFoods.foodAmount)) AS energy,
        ROUND(SUM(foods.protein / 100 * consumedFoods.foodAmount)) AS protein,
        ROUND(SUM(foods.carbs / 100 * consumedFoods.foodAmount)) AS carbs,
        ROUND(SUM(foods.fat / 100 * consumedFoods.foodAmount)) AS fat,
        DATE(consumedFoods.timeOfConsumption) AS date
        FROM consumedFoods
        LEFT JOIN foods ON foods.foodId = consumedFoods.foodId
        WHERE consumedFoods.timeOfConsumption <= MAKEDATE(?, ?) + INTERVAL 1 DAY
        AND consumedFoods.timeOfConsumption > MAKEDATE(?, ?)
        AND consumedFoods.foodId != 99999
        AND consumedFoods.userId = ? AND consumedFoods.active = 1
        GROUP BY DATE(consumedFoods.timeOfConsumption) DESC
    `;

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            if(err) reject(err);
            connection.release();
            connection.query(query, data, function (err, results) {
                if(err) reject(err);
                resolve(results);
            });
        })
    })
    .then(function (results) {
        return results;
    })
    .catch(function (err) {
        console.log(err);
    })
}