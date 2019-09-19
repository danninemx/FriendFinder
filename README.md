# Friend Finder

## Overview

This full-stack web application provides a social networking platform via rudimentary matchmaking algorithm.

It take in results from users' surveys, then compares their answers with those from other users. The app will then display the name and picture of the user with the best overall match.

Used Express to handle routing, and hosted on Heroku.

---

## How it works

1. User fills out a 10-question survey to provide data to find a match for.

2. `server.js` uses npm packages `express` and `path` to guide the user and process user input.

3. `htmlRoutes.js` file includes two routes:

   - A GET Route to `/survey` that displays the survey page.
   - A default, catch-all route that leads to `home.html` which displays the home page.

4. `apiRoutes.js` file contains two routes:

   - A GET route with the url `/api/friends`. This displays a JSON of all possible friends.
   - A POST route to `/api/friends`. This handles incoming survey results and the compatibility logic.

5. Data is save to `app/data/friends.js` as an array of objects. Each of these objects follows the format below.

```json
{
  "name": "Vault Boy",
  "photo": "https://screenrant.com/wp-content/uploads/2017/05/Fallout-Vault-Boy.jpg",
  "scores": [5, 1, 4, 1, 1, 1, 1, 1, 1, 1]
}
```

6. It determines the user's most compatible friend as follows:

   - Convert each user's results into a simple array of numbers (ex: `[5, 1, 4, 1, 1, 1, 1, 1, 1, 1]`).
   - With that done, compare the difference between current user's scores against those from other users, question by question. Add up the differences to calculate the `totalDifference`.
     - Example:
       - User 1: `[5, 1, 4, 1, 1, 1, 1, 1, 1, 1]`
       - User 2: `[3, 2, 6, 1, 1, 1, 1, 1, 1, 1]`
       - Total Difference: **2 + 1 + 2 =** **_5_**
   - The closest match will be the user with the least amount of difference.

7. The current user's most compatible friend is displayed as a modal pop-up that includes the friend's name and picture(if available).

---

## Components

- [Node.js](https://nodejs.org/en/)
- [NPM: Express](https://www.npmjs.com/package/express)
- [Bootstrap](http://getbootstrap.com)
- [Font Awesome](https://fontawesome.com)
- [jQuery](http://jquery.com)
- [Chosen jQuery plugin](https://harvesthq.github.io/chosen/)
