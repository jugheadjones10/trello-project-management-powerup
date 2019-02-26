var moment = require("moment")

var numberOfDays = function (startDate) {
  var now = new moment()
  var dateStarted = moment(startDate)
  var yearsToDays = Math.round(moment.duration(now.diff(dateStarted)).as("seconds"))
  return yearsToDays
}

module.exports = {
  numberOfDays: numberOfDays
}