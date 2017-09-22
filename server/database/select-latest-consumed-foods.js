var getConnection = require('./create-connection');

module.exports = function selectLatestConsumedfoods(userId) {
    var query = `
        SELECT foods.*, COUNT(favorites.foodId) > 0 AS isInFavorites
        FROM consumedfoods
        INNER JOIN foods ON consumedfoods.foodId = foods.foodId
        LEFT JOIN favorites ON consumedfoods.foodId = favorites.foodId
        WHERE consumedfoods.userId = ? AND consumedfoods.foodId != 99999
        GROUP BY consumedfoods.foodId, consumedfoods.timeOfConsumption
        ORDER BY consumedfoods.timeOfConsumption DESC
        LIMIT 20
    `;

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            connection.release();
            if(err) return reject(err);
            connection.query(query, [userId], function (err, results) {
              if(err) return reject(err);
              return resolve(results);
            });
        });
    })
    .then(function (results) {
        return results.map(function (row) {
            return {
                id: row.foodId,
                name: row.foodName,
                energy: row.energy,
                protein: row.protein,
                carbs: row.carbs,
                fat: row.fat,
                portionSizes: JSON.parse(row.portionSizes),
                isInFavorites: row.isInFavorites ? true : false,
            }
        });
    })
    .catch(function (err) {
        console.log(err);
        throw err;
    });
}
