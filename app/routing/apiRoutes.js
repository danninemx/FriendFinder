// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friends = require("../data/friends");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // When user visits the route, display all friends in the array.
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    // API POST Request
    // User's form info is pushed to friends array and matching friend is returned.
    // ---------------------------------------------------------------------------

    app.post("/api/friends", function (req, res) {
        let myScores = req.body.scores;
        let totalDifference = 40;
        let tempDiff = 0;
        let bestMatch = {};

        console.log('myScores = ' + myScores);

        // For each friend object in the array...
        for (let i = 0; i < friends.length; i++) {

            // For each score in the friend's scores array...
            for (let j = 0; j < friends[i].scores.length; j++) {
                // Sum the total difference.
                tempDiff += Math.abs(myScores[j] - friends[i].scores[j]);
            }

            // If difference is lower than record, update record and the "best match" and reset tempDiff. Else ignore.
            if (tempDiff <= totalDifference) {
                bestMatch = friends[i];
                totalDifference = tempDiff;
            }
            tempDiff = 0;
        };
        // Add user data to friends array
        friends.push(req.body);

        // Return the best matched friend object
        res.json(bestMatch);
    });
};
