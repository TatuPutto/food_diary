var getConnection = require('./create-connection');

module.exports = function selectDatesWhichHaveEntries(userId) {
    var query = `
        SELECT DISTINCT(DATE_FORMAT(timeOfConsumption, "%d-%m-%Y"))
        AS timeOfConsumption
        FROM consumedfoods WHERE userId = ? AND active = 1
        ORDER BY timeOfConsumption DESC
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
    .then(function (dates) {
        return dates.map(function (date) {
            return date.timeOfConsumption;
        });
    })
    .catch(function (err) {
        console.log(err);
        throw err;
    });
}
