// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friends = require("../data/friends");
// var waitListData = require("../data/waitinglistData");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // When a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a survey... this data is then sent to the server...
    // Then the server saves the data to the friends array)
    // ---------------------------------------------------------------------------

    app.post("/api/friends", function (req, res) {
        let myScores = req.body.scores;
        let totalDifference = 40;
        let tempDiff = 0;
        let bestMatch = {};

        console.log('myScores = ' + myScores);

        // console.log('Current List is ' + friends);

        // For each friend object in the array...
        for (let i = 0; i < friends.length; i++) {

            // For each score in the friend's scores array...
            for (let j = 0; j < friends[i].scores.length; j++) {
                // Sum the total difference.
                tempDiff += Math.abs(myScores[j] - friends[i].scores[j]);
            }

            // If difference is lower than record, update record and the "best match" and reset tempDiff. Else ignore.
            if (tempDiff < totalDifference) {
                bestMatch = friends[i];
                totalDifference = tempDiff;
                tempDiff = 0;
            }
        };
        // Note the code here. Our "server" will respond to requests and let users know if they have a match or not.
        // It will do this by sending out the value "true" have a friend
        // req.body is available since we're using the body parsing middleware
        friends.push(req.body);
        // console.log('req.body = ' + req.body);

        // console.log('bestMatch = ' + bestMatch);
        // res.json(true);
        // Return the best matched friend object
        res.json(bestMatch);
    });
};
