var getConnection = require('./create-connection');

module.exports = function getFavoriteFoods(userId) {
    var query = `
        SELECT foods.*
        FROM favorites
        INNER JOIN foods ON favorites.foodId = foods.foodId
        WHERE favorites.userId = ?
        ORDER BY foods.foodName
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
                isInFavorites: true
            }
        });
    })
    .catch(function (err) {
        throw err;
    });
}
