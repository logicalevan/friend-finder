var express = require('express');
var bodyParser = require("body-parser");
var friends = require('../data/friends.js');

var router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/api/friends", function (req, res) {
  res.send(friends);
});

router.post("/api/friends", function (req, res) {
  var user = req.body;
  var intarr = [];
  user.scores.forEach(function(number){
    intarr.push(parseInt(number));
  });
  //console.log(intarr);
  var firstDiff = compare(friends[0].scores, intarr);
  // console.log(firstDiff);
  var match = friends[0];
  for (var i = 1; i < friends.length; i++) {
    var secDiff = compare(friends[i].scores, intarr)
    if (secDiff < firstDiff) {
      match = friends[i];
    }
  };
  friends.push(user);
  console.log("match", match);
  res.json(match);
});

function compare(userScore, defaultScore){
  var totalDifference = 0
  for (var i = 0; i < userScore.length; i++) {
      totalDifference += Math.abs(defaultScore[i] - userScore[i]);
  }
  return totalDifference
};
// if totalDifference < difference, log match index to push data to client
module.exports = router;
