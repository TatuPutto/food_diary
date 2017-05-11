var getConnection = require('../database/create-connection');

module.exports = function addFoodToConsumedFoods(userId, consumptionId) {
    var query = `UPDATE consumedfoods SET active=0 ` +
            `WHERE consumptionId=${consumptionId}`;

    return new Promise(function (resolve, reject) {
        getConnection(function (err, connection) {
            if(err) reject(err);
            connection.query(query, function (err) {
                if(err) reject(err);
                resolve();
            });
            connection.release();
        });
    }).catch(function (err) {
        throw err;
    });
}
